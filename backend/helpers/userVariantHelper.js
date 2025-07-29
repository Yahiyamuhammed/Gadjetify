const Variant = require('../models/variantModel');

exports.fetchVariantsForProduct = async (productId) => {
  return await Variant.find({
    productId,
    isDeleted: { $ne: true },
  }).lean();
};
