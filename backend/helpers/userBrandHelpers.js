const Brand = require("../models/brandModel");

exports.getAllBrands = async (query = {}) => {
  const { search = "", page = 1, limit = 10 } = query;

  const filter = { isDeleted: false };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [brands, totalCount] = await Promise.all([
    Brand.find(filter)
      .collation({ locale: "en", strength: 2 })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Brand.countDocuments(filter),
  ]);

  return {
    brands,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page),
  };
};
