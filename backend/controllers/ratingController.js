const { upsertRating, getUserRatingForVariant } = require("../helpers/ratingHelper");

const rateProduct = async (req, res) => {
  try {
    const { productId, variantId, rating } = req.body;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const saved = await upsertRating({ userId, productId, variantId, rating });
    res.status(200).json({ message: "Rating saved", rating: saved });
  } catch (err) {
    res.status(500).json({ message: "Error saving rating", error: err.message });
  }
};

const getUserRating = async (req, res) => {
  try {
    const { variantId } = req.params;
    const userId = req.user._id;
    const rating = await getUserRatingForVariant(userId, variantId);
    res.status(200).json({ rating });
  } catch (err) {
    res.status(500).json({ message: "Error fetching rating", error: err.message });
  }
};

module.exports = { rateProduct, getUserRating };
