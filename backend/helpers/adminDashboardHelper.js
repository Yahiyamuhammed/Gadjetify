const Order = require("../models/orderModel");
const mongoose = require("mongoose");

// utility: calculate percentage change
function calcChange(current, previous) {
  if (previous === 0) {
    return {
      percent: current > 0 ? 100 : 0,
      trend: current > 0 ? "up" : "down",
    };
  }
  const percent = ((current - previous) / previous) * 100;
  return { percent, trend: percent >= 0 ? "up" : "down" };
}

// main summary function
exports.getSummaryData = async () => {
  const now = new Date();

  // define periods
  const sixMonthsAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 6,
    now.getDate()
  );
  const twelveMonthsAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 12,
    now.getDate()
  );

  // get orders for current 6 months and previous 6 months
  const currentOrders = await Order.find({ createdAt: { $gte: sixMonthsAgo } });
  const previousOrders = await Order.find({
    createdAt: { $gte: twelveMonthsAgo, $lt: sixMonthsAgo },
  });

  // helper for summing values
  const sum = (orders, fn) =>
    orders.reduce((total, order) => total + fn(order), 0);

  // revenue
  const currentRevenue = sum(currentOrders, (o) =>
    o.paymentStatus === "paid" && o.status !== "Cancelled" ? o.finalTotal : 0
  );
  const previousRevenue = sum(previousOrders, (o) =>
    o.paymentStatus === "paid" && o.status !== "Cancelled" ? o.finalTotal : 0
  );

  // orders count
  const currentOrderCount = currentOrders.length;
  const previousOrderCount = previousOrders.length;

  // active customers (unique userIds)
  const currentCustomers = new Set(currentOrders.map((o) => String(o.userId)))
    .size;
  const previousCustomers = new Set(previousOrders.map((o) => String(o.userId)))
    .size;

  // refunds
  const currentRefunds = sum(
    currentOrders,
    (o) => o.items.filter((i) => i.returnStatus === "returned").length
  );
  const previousRefunds = sum(
    previousOrders,
    (o) => o.items.filter((i) => i.returnStatus === "returned").length
  );

  // build response
  const formatResult = (value, change, upMsg, downMsg) => ({
    value,
    change: `${change.percent.toFixed(1)}%`,
    trend: change.trend,
    description: change.trend === "up" ? upMsg : downMsg,
  });

  return {
    totalRevenue: formatResult(
      currentRevenue,
      calcChange(currentRevenue, previousRevenue),
      "Trending up this period",
      "Revenue decreased"
    ),
    totalOrders: formatResult(
      currentOrderCount,
      calcChange(currentOrderCount, previousOrderCount),
      "Orders increased",
      "Orders decreased"
    ),
    activeCustomers: formatResult(
      currentCustomers,
      calcChange(currentCustomers, previousCustomers),
      "Strong user retention",
      "Customer base declined"
    ),
    refunds: formatResult(
      currentRefunds,
      calcChange(currentRefunds, previousRefunds),
      "Refunds increased",
      "Refunds decreased"
    ),
  };
};

exports.getSalesReportHelper = async ({ startDate, endDate, period }) => {
  const matchStage = {
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
    // status: "Delivered" ,
    paymentStatus: "paid",
  };

  // Group format based on period
  let groupId = null;
  if (period === "day") {
    groupId = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
  } else if (period === "month") {
    groupId = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
  } else if (period === "year") {
    groupId = { $dateToString: { format: "%Y", date: "$createdAt" } };
  } else {
    // default daily
    groupId = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
  }

  const report = await Order.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: groupId,
        orders: { $sum: 1 },
        revenue: { $sum: "$finalTotal" },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        orders: 1,
        revenue: 1,
      },
    },
  ]);

  return report;
};
