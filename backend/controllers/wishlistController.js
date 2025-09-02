const { getWishlist, toggleWishlistItem, removeFromWishlist,  clearWishlist} = require("../helpers/wishlistHelper");

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await getWishlist(userId);
    res.json({ wishlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get wishlist' });
  }
};

exports.toggleWishlistItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;
    const updatedWishlist = await toggleWishlistItem(userId, productId, variantId);
    res.json({ wishlist: updatedWishlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle wishlist item' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;
    const updatedWishlist = await removeFromWishlist(userId, productId, variantId);
    res.json({ wishlist: updatedWishlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    await clearWishlist(userId);
    res.status(200).json({ message: 'Wishlist cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear wishlist' });
  }
};
