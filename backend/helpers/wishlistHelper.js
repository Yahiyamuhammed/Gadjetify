const Wishlist = require("../models/wishListModel");


exports.getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId })
    .populate("items.product")
    .populate("items.variant");

  if (!wishlist) return [];

  const structuredRes = wishlist.items.map(({ product, variant }) => ({
    ...product.toObject(),   // include all product fields
    defaultVariant: 
      {
        _id: variant._id,
        price: variant.price,
        stock: variant.stock,
        ram: variant.ram,
        storage: variant.storage,
        isDefault: variant.isDefault,
        isDeleted: variant.isDeleted,
        createdAt: variant.createdAt,
        updatedAt: variant.updatedAt,
      },
    
  }));

  return structuredRes;
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
