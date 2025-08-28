const Order = require("../models/orderModel");
const mongoose = require("mongoose");

exports.generateSalesReport = async ({ startDate, endDate, period, page, limit }) => {
  const match = { paymentStatus: "paid" };

  // Date filters
  if (startDate && endDate) {
    match.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  } else if (period) {
    const now = new Date();
    if (period === "day") {
      match.createdAt = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
    } else if (period === "week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      match.createdAt = { $gte: startOfWeek };
    } else if (period === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      match.createdAt = { $gte: startOfMonth };
    } else if (period === "year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      match.createdAt = { $gte: startOfYear };
    }
  }

  const skip = (page - 1) * limit;

  const pipeline = [
    { $match: match },
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalAmount: { $sum: "$summary.total" },
              totalDiscount: { $sum: "$summary.totalDiscount" },
              couponDiscount: { $sum: "$summary.customDiscount" },
            },
          },
        ],
        orders: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: parseInt(limit) },
          {
            $project: {
              _id: 1,
              userId: 1,
              status: 1,
              createdAt: 1,
              finalTotal: 1,
              "summary.totalDiscount": 1,
              "summary.couponDiscount": 1,
            },
          },
        ],
      },
    },
  ];

  const result = await Order.aggregate(pipeline);

  return {
    summary: result[0].summary[0] || {
      totalOrders: 0,
      totalAmount: 0,
      totalDiscount: 0,
      couponDiscount: 0,
    },
    orders: result[0].orders,
    pagination: { page, limit },
  };
};
