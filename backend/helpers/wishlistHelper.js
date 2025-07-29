const Wishlist = require("../models/wishListModel");

exports.getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId })
    .populate("items.product")
    .populate("items.variant");
  return wishlist ? wishlist.items : [];
};

exports.toggleWishlistItem = async (userId, productId, variantId) => {
  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = new Wishlist({ user: userId, items: [] });
  }

  const index = wishlist.items.findIndex(
    (item) =>
      item.product.toString() === productId &&
      item.variant.toString() === variantId
  );

  if (index !== -1) {
    wishlist.items.splice(index, 1); // remove if exists
  } else {
    wishlist.items.push({ product: productId, variant: variantId });
  }

  await wishlist.save();
  return wishlist.items;
};

exports.removeFromWishlist = async (userId, productId, variantId) => {
  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) return [];

  wishlist.items = wishlist.items.filter(
    (item) =>
      !(
        item.product.toString() === productId &&
        item.variant.toString() === variantId
      )
  );

  await wishlist.save();
  return wishlist.items;
};

exports.clearWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    wishlist.items = [];
    await wishlist.save();
  }
};
