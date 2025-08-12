const { getAllBrands } = require("../helpers/userBrandHelpers");

exports.getUserBrands = async (req, res) => {
  try {
    const brands = await getAllBrands(req.query, { includeBlockedOrDeleted: false });
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch brands", error: err.message });
  }
};
