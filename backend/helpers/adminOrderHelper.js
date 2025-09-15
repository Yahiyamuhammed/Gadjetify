const Order = require("../models/orderModel");
const Variant = require("../models/variantModel");
const WalletTransaction = require("../models/walletTransactionModel");
const User = require("../models/userModal");
exports.approveReturnHelper = async ({ orderId, itemId }) => {
  const order = await Order.findById(orderId);
  if (!order) return { status: 404, message: "Order not found" };

  const item = order.items.id(itemId);
  if (!item) return { status: 404, message: "Item not found" };
  if (item.returnStatus !== "requested")
    return { status: 400, message: "Invalid return state" };

  const itemBase = item.price * item.quantity;
  const itemOfferDiscount =
    (item.totalOfferDiscount || 0) + (item.customDiscount || 0);
  const itemAfterOffer = itemBase - itemOfferDiscount;

  const subtotalAfterOffers =
    order.summary.subtotal - order.summary.totalDiscount;

  let itemCouponShare = 0;
  if (order.summary.coupon && order.summary.coupon.discountAmount > 0) {
    const { discountAmount, minPurchase } = order.summary.coupon;
    const remainingSubtotal = subtotalAfterOffers - itemAfterOffer;

    if (!minPurchase || remainingSubtotal >= minPurchase) {
      itemCouponShare = (itemAfterOffer / subtotalAfterOffers) * discountAmount;
    } else {
      const originalPaid = order.finalTotal;
      const newTotal = remainingSubtotal + order.summary.tax;
      const refundAmount = originalPaid - newTotal;

      item.returnStatus = "returned";
      item.returnApprovedAt = new Date();
      item.refundAmount = refundAmount;
      await order.save();

      await Variant.findByIdAndUpdate(item.variantId, {
        $inc: { stock: item.quantity },
      });

      await WalletTransaction.create({
        userId: order.userId,
        amount: refundAmount,
        type: "credit",
        description: `Refund for ${item.productName}`,
        relatedOrderId: order._id,
        relatedOrderItemId: item._id,
      });

      await User.findByIdAndUpdate(order.userId, {
        $inc: { wallet: refundAmount },
      });

      return {
        status: 200,
        message:
          "Return approved, stock updated and wallet credited (coupon invalidated)",
        refundAmount,
      };
    }
  }
  const totalItemBase = order.items.reduce(
    (acc, it) => acc + it.price * it.quantity,
    0
  );

  const itemProportion = (item.price * item.quantity) / totalItemBase;

  const itemDiscountShare = itemProportion * order.summary.totalDiscount;
  const itemTaxShare = itemProportion * order.summary.tax;

  const refundAmount = itemBase - itemDiscountShare + itemTaxShare;

  item.returnStatus = "returned";
  item.returnApprovedAt = new Date();
  item.refundAmount = refundAmount;
  await order.save();

  await Variant.findByIdAndUpdate(item.variantId, {
    $inc: { stock: item.quantity },
  });

  await WalletTransaction.create({
    userId: order.userId,
    amount: refundAmount,
    type: "credit",
    description: `Refund for ${item.productName}`,
    relatedOrderId: order.orderId,
    relatedOrderItemId: item._id,
  });

  await User.findByIdAndUpdate(order.userId, {
    $inc: { wallet: refundAmount },
  });

  return {
    status: 200,
    message: "Return approved, stock updated and wallet credited",
    refundAmount,
  };
};

exports.getAllOrdersHelper = async ({ page, limit, search }) => {
  const query = search
    ? {
        $or: [
          { "items.productName": { $regex: search, $options: "i" } },
          { "items.brandName": { $regex: search, $options: "i" } },
          { "addressSnapshot.name": { $regex: search, $options: "i" } },
          { status: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .select("-__v");

  const total = await Order.countDocuments(query);

  return {
    status: 200,
    message: "Orders fetched",
    data: orders,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
  };
};

exports.updateOrderStatusHelper = async ({ orderId, status }) => {
  const order = await Order.findById(orderId);
  if (!order) {
    return { status: 404, message: "Order not found" };
  }

  if (order.status === "Cancelled" || order.status === "Delivered") {
    return {
      status: 400,
      message: `Order already ${order.status.toLowerCase()}, status cannot be changed.`,
    };
  }
  order.status = status;

  if (status === "Delivered") {
    order.deliveredAt = new Date();
    order.paymentStatus = "paid";
  }
  if (status === "cancelled") {
    order.cancelledAt = new Date();
  }

  await order.save();

  return {
    status: 200,
    message: `Order status updated to ${status}`,
    data: order,
  };
};
