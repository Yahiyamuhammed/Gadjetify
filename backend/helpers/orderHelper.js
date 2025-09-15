const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Variant = require("../models/variantModel");
const Brand = require("../models/brandModel");
const Address = require("../models/addressModal");
const Cart = require("../models/cartModel");
const WalletTransaction = require("../models/walletTransactionModel");
const User = require("../models/userModal");
const { nanoid } = require("nanoid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const generateOrderId = () => `ORD-${nanoid(8).toUpperCase()}`;
exports.getUserOrders = async ({ userId, page = 1, limit = 5 }) => {
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");

  const simplifiedOrders = orders.map((order) => ({
    orderDbId: order._id,
    orderId: order.orderId,
    status: order.status,
    date: order.createdAt,
    items: order.items.map((item) => ({
      image: item.image || null,
      name: item.productName,
      ram: item.ram,
      storage: item.storage,
      quantity: item.quantity,
      price: item.quantity * item.price,
    })),
  }));

  return {
    status: 200,
    message: "Orders fetched successfully",
    data: simplifiedOrders,
  };
};

exports.getOrderById = async (userId, orderId) => {
  const order = await Order.findOne({ userId, _id: orderId }).select("-__v");

  if (!order) {
    return { status: 404, message: "Order not found" };
  }
  const simplifiedOrder = {
    orderDbId: order._id,
    orderId: order.orderId,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    addressSnapshot: order.addressSnapshot,
    retryAvailiable: order?.retryAvailableUntil,
    summary: order.summary,
    items: order.items.map((item) => ({
      productName: item.productName,
      image: item.image || null,
      ram: item.ram,
      storage: item.storage,
      price: item.price,
      quantity: item.quantity,
      itemId: item._id,
      returnStatus: item?.returnStatus,
      productId: item.productId,
      variantId: item.variantId,
    })),
  };

  console.log(order);
  return {
    status: 200,
    message: "Order details fetched successfully",
    data: simplifiedOrder,
  };
};

exports.placeOrder = async ({
  userId,
  addressId,
  paymentMethod,
  items,
  finalTotal,
  summary,
  paymentIntentId,
}) => {
  let refund = false;

  if (
    !addressId ||
    !items?.length ||
    !paymentMethod ||
    !finalTotal ||
    !summary
  ) {
    if (paymentIntentId) {
      refund = await handleOnlineRefund(
        userId,
        paymentMethod,
        paymentIntentId,
        finalTotal
      );
    }
    return {
      status: 400,
      message: `Missing required fields${
        refund
          ? " - If any amount has been deducted from your account, it will be credited to your wallet."
          : ""
      }`,
    };
  }

  if (!items || items.length === 0) {
    if (paymentIntentId) {
      refund = await handleOnlineRefund(
        userId,
        paymentMethod,
        paymentIntentId,
        finalTotal
      );
    }
    return {
      status: 400,
      message: `No items to order${
        refund
          ? " - If any amount has been deducted from your account, it will be credited to your wallet."
          : ""
      }`,
    };
  }

  const address = await Address.findById(addressId).lean();

  if (!address) {
    if (paymentIntentId) {
      refund = await handleOnlineRefund(
        userId,
        paymentMethod,
        paymentIntentId,
        finalTotal
      );
    }
    return {
      status: 404,
      message: `Address not found${
        refund
          ? " - If any amount has been deducted from your account, it will be credited to your wallet."
          : ""
      }`,
    };
  }

  if (paymentMethod === "wallet") {
    const user = await User.findById(userId).lean();
    if (!user || user.walletBalance < finalTotal) {
      return { status: 400, message: "Insufficient wallet balance" };
    }
  }

  const itemSnapshots = [];
  const stockUpdates = [];

  for (let item of items) {
    const { productId, variantId, quantity } = item;

    const product = await Product.findById(productId).lean();
    const variant = await Variant.findById(variantId).lean();
    const brand = await Brand.findById(product.brand).lean();

    if (!product || !variant || !brand) {
      if (paymentIntentId) {
        refund = await handleOnlineRefund(
          userId,
          paymentMethod,
          paymentIntentId,
          finalTotal
        );
      }
      return {
        status: 404,
        message: `Product, Variant, or Brand not found${
          refund
            ? " - If any amount has been deducted from your account, it will be credited to your wallet."
            : ""
        }`,
      };
    }

    if (variant.isDeleted) {
      if (paymentIntentId) {
        refund = await handleOnlineRefund(
          userId,
          paymentMethod,
          paymentIntentId,
          finalTotal
        );
      }
      return {
        status: 400,
        message: `The variant ${variant.ram}GB / ${
          variant.storage
        }GB is no longer available for ${product.name}${
          refund
            ? " - If any amount has been deducted from your account, it will be credited to your wallet."
            : ""
        }`,
      };
    }

    if (variant.stock < quantity) {
      if (paymentIntentId) {
        refund = await handleOnlineRefund(
          userId,
          paymentMethod,
          paymentIntentId,
          finalTotal
        );
      }
      return {
        status: 400,
        message: `Not enough stock available for ${product.name}${
          refund
            ? " - If any amount has been deducted from your account, it will be credited to your wallet."
            : ""
        }`,
      };
    }

    itemSnapshots.push({
      productId,
      productName: product.name,
      brandId: brand._id,
      brandName: brand.name,
      variantId,
      ram: variant.ram,
      storage: variant.storage,
      price: variant.price,
      quantity,
      offerPercentage: product.offerPercentage,
      image: product.images[0].url || "",
    });

    stockUpdates.push({ variantId, quantity });
  }

  for (let update of stockUpdates) {
    await Variant.findByIdAndUpdate(update.variantId, {
      $inc: { stock: -update.quantity },
    });
  }

  const orderId = generateOrderId();

  const newOrder = await Order.create({
    orderId,
    userId,
    addressId,
    addressSnapshot: {
      name: address.name,
      phone: address.phone,
      alternatePhone: address.alternatePhone,
      pincode: address.pincode,
      locality: address.locality,
      address: address.address,
      district: address.district,
      state: address.state,
      landmark: address.landmark,
    },
    paymentMethod,
    paymentStatus: paymentMethod === "wallet" ? "paid" : "pending",
    items: itemSnapshots,
    finalTotal,
    summary,
  });

  if (paymentMethod === "wallet") {
    await User.findByIdAndUpdate(userId, {
      $inc: { walletBalance: -finalTotal },
    });

    await WalletTransaction.create({
      userId,
      amount: finalTotal,
      type: "debit",
      description: "Payment for order",
      relatedOrderId: newOrder._id,
    });
  }

  await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );

  return {
    status: 201,
    message: "Order placed successfully",
    // data: newOrder,
    orderId: newOrder._id,
  };
};

async function handleOnlineRefund(
  userId,
  paymentMethod,
  paymentIntentId,
  amount
) {
  if (paymentMethod !== "Online Payment") return;

  try {
    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      if (paymentIntent.status === "succeeded") {
        await User.findByIdAndUpdate(userId._id, {
          $inc: { walletBalance: amount },
        });
        await WalletTransaction.create({
          userId,
          amount,
          type: "credit",
          description: "Refund for failed order (credited to wallet)",
        });
        return true;
      }
    }
  } catch (err) {
    console.error("Wallet refund error:", err);
  }
}

exports.requestReturnHelper = async ({ userId, orderId, itemId, reason }) => {
  const order = await Order.findOne({ _id: orderId, userId });

  if (!order) return { status: 404, message: "Order not found" };

  const item = order.items.id(itemId);
  if (!item) return { status: 404, message: "Item not found" };

  if (item.returnStatus !== "not_requested")
    return { status: 400, message: "Return already requested or processed" };

  item.returnStatus = "requested";
  item.returnReason = reason;
  item.returnRequestedAt = new Date();

  await order.save();

  return { status: 200, message: "Return requested successfully" };
};

exports.cancelOrderHelper = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, userId });

  if (!order) {
    return { status: 404, message: "Order not found" };
  }

  if (order.status === "Delivered") {
    return { status: 400, message: "Cannot cancel a delivered order" };
  }

  // Check if already cancelled
  if (order.status === "Cancelled") {
    return { status: 400, message: "Order already cancelled" };
  }

  // Update order status
  order.status = "Cancelled";

  for (const item of order.items) {
    await Variant.findByIdAndUpdate(item.variantId, {
      $inc: { stock: item.quantity },
    });
  }

  // Refund to wallet if paid
  if (order.paymentStatus === "paid") {
    const refundAmount = order.summary.total;

    // Create wallet transaction
    await WalletTransaction.create({
      userId: order.userId,
      amount: refundAmount,
      type: "credit",
      description: `Refund for cancelled order ${order._id}`,
      relatedOrderId: order._id,
    });

    // Update user wallet
    await User.findByIdAndUpdate(order.userId, {
      $inc: { wallet: refundAmount },
    });
  }
  await order.save();

  return { status: 200, message: "Order cancelled successfully", data: order };
};
