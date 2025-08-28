const { generateSalesReport } = require("../helpers/adminReportHelper");

exports.getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, period, page = 1, limit = 10 } = req.query;

    const report = await generateSalesReport({
      startDate,
      endDate,
      period,
      page,
      limit,
    });

    res.json({ success: true, data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch report" });
  }
};
