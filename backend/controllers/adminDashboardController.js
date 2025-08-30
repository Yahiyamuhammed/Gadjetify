const {
  getSummaryData,
  getSalesReportHelper,
  getTopSellingProducts,
  getTopBrands,
} = require("../helpers/adminDashboardHelper");

exports.fetchSummary = async (req, res) => {
  try {
    const data = await getSummaryData();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching summary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, period } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }
    const report = await getSalesReportHelper({ startDate, endDate, period });
    return res.status(200).json({
      status: 200,
      message: "Sales report fetched successfully",
      data: report,
    });
  } catch (err) {
    console.error("Sales Report Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.fetchTopProducts = async (req, res) => {
  try {
    const data = await getTopSellingProducts();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.fetchTopBrands = async (req, res) => {
  try {
    const brands = await getTopBrands();
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    console.error("Error fetching top brands:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
