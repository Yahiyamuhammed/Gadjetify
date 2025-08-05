const Order = require('../models/orderModel');
const Variant = require('../models/variantModel');
const WalletTransaction = require('../models/walletTransactionModel');

exports.approveReturnHelper = async ({ orderId, itemId }) => {
  const order = await Order.findById(orderId);
  if (!order) return { status: 404, message: "Order not found" };

  const item = order.items.id(itemId);
  if (!item) return { status: 404, message: "Item not found" };
  if (item.returnStatus !== 'requested') return { status: 400, message: "Invalid return state" };

  const refundAmount = item.price * item.quantity;

  // Update item return status
  item.returnStatus = 'returned';
  item.returnApprovedAt = new Date();
  item.refundAmount = refundAmount;
  await order.save();

  // Update stock in Variant collection
  await Variant.findByIdAndUpdate(item.variantId, { $inc: { stock: item.quantity } });

  // Add to WalletTransaction
  await WalletTransaction.create({
    userId: order.userId,
    amount: refundAmount,
    type: 'credit',
    description: `Refund for ${item.productName}`,
    relatedOrderId: order._id,
    relatedOrderItemId: item._id,
  });

  return { status: 200, message: "Return approved, stock updated and wallet credited" };
};

exports.getAllOrdersHelper = async ({ page, limit, search }) => {
  const query = search
    ? {
        $or: [
          { "items.productName": { $regex: search, $options: 'i' } },
          { "items.brandName": { $regex: search, $options: 'i' } },
          { "addressSnapshot.name": { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } }
        ]
      }
    : {};

  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .select('-__v');

  const total = await Order.countDocuments(query);

  return {
    status: 200,
    message: "Orders fetched",
    data: orders,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    }
  };
};
