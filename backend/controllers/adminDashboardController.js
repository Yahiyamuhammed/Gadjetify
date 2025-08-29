const { getSummaryData } = require("../helpers/adminDashboardHelper");

exports.getSummary = async (req, res) => {
  try {
    const data = await getSummaryData();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching summary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
