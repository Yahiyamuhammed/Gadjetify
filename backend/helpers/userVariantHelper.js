const Variant = require('../models/variantModel');

const fetchVariantsForProduct = async (productId) => {
  return await Variant.find({
    productId,
    isDeleted: { $ne: true },
  }).lean();
};

module.exports = {
  fetchVariantsForProduct,
};
