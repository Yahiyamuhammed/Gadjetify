const Order = require("../models/orderModel");

exports.getSummaryData = async () => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { paymentStatus: "paid", status: { $ne: "Cancelled" } } },
      { $group: { _id: null, totalRevenue: { $sum: "$finalTotal" } } }
    ]);

    const activeCustomers = await Order.distinct("userId");

    const refunds = await Order.aggregate([
      { $unwind: "$items" },
      { $match: { "items.returnStatus": "returned" } },
      { $count: "refunds" }
    ]);

    return {
      totalRevenue: revenueAgg[0]?.totalRevenue || 0,
      totalOrders,
      activeCustomers: activeCustomers.length,
      refunds: refunds[0]?.refunds || 0
    };
  } catch (error) {
    throw error;
  }
};
