const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Variant = require("../models/variantModel");
const Brand = require("../models/brandModel");
const Address = require("../models/addressModal");
const Cart = require("../models/cartModel");
const WalletTransaction = require("../models/walletTransactionModel");
const User = require("../models/userModal");
const { nanoid } = require("nanoid");

const generateOrderId = () => `ORD-${nanoid(8).toUpperCase()}`;

exports.getUserOrders = async (userId) => {
  const orders = await Order.find({ userId })

    .sort({ createdAt: -1 })
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
}) => {
  if (!items || items.length === 0) {
    return { status: 400, message: "No items to order" };
  }

  if (
    !addressId ||
    !items?.length ||
    !paymentMethod ||
    !finalTotal ||
    !summary
  ) {
    return { status: 400, message: "Missing required fields" };
  }

  const address = await Address.findById(addressId).lean();

  if (!address) {
    return { status: 404, message: "Address not found" };
  }

  const itemSnapshots = [];
  const stockUpdates = [];

  for (let item of items) {
    console.log(items);
    const { productId, variantId, quantity } = item;

    const product = await Product.findById(productId).lean();
    const variant = await Variant.findById(variantId).lean();
    const brand = await Brand.findById(product.brand).lean();

    if (!product || !variant || !brand) {
      return { status: 404, message: "Product, Variant, or Brand not found" };
    }

    if (variant.isDeleted) {
      return {
        status: 400,
        message: `The Variant  ${variant.ram} GB ${variant.storage} GB doesn't availiable for ${product.name}`,
      };
    }

    if (variant.stock < quantity) {
      return { status: 400, message: `Not enough stock for ${product.name}` };
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
    paymentStatus: "pending",
    items: itemSnapshots,
    finalTotal,
    summary,
  });

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
