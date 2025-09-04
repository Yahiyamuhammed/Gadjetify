const Rating = require("../models/ratingModel");
const Variant = require("../models/variantModel");
const Product = require("../models/productModel");

// Add or update rating
const upsertRating = async ({ userId, productId, variantId, rating }) => {
  // upsert user rating
  const updated = await Rating.findOneAndUpdate(
    { userId, variantId },
    { userId, productId, variantId, rating },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // recalc variant rating
  const stats = await Rating.aggregate([
    { $match: { variantId } },
    { $group: { _id: "$variantId", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
  ]);

  if (stats.length > 0) {
    await Variant.findByIdAndUpdate(variantId, {
      avgRating: stats[0].avg,
      ratingCount: stats[0].count
    });
  }

  // recalc product rating from all variants
  const productStats = await Rating.aggregate([
    { $match: { productId } },
    { $group: { _id: "$productId", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
  ]);

  if (productStats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      avgRating: productStats[0].avg,
      ratingCount: productStats[0].count
    });
  }

  return updated;
};

const getUserRatingForVariant = async (userId, variantId) => {
  return Rating.findOne({ userId, variantId });
};

module.exports = { upsertRating, getUserRatingForVariant };
