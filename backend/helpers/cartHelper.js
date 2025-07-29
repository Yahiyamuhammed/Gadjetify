const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Variant = require("../models/variantModel");
const Wishlist = require("../models/wishListModel");

exports.addToCart = async (userId, { productId, variantId }) => {
  const product = await Product.findById(productId);
  if (!product || product.isBlocked || !product.isListed) {
    throw new Error("Product not available");
  }

  if (product.category?.isBlocked) {
    throw new Error("Product category is blocked");
  }

  const variant = await Variant.findById(variantId);
  if (!variant || variant.isDeleted || variant.stock < 1) {
    throw new Error("Variant not available");
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.variantId.toString() === variantId
  );

  if (itemIndex > -1) {
    const currentQuantity = cart.items[itemIndex].quantity;
    if (currentQuantity + 1 > variant.stock) {
      throw new Error("Quantity exceeds stock");
    }
    cart.items[itemIndex].quantity += 1;
  } else {
    cart.items.push({ productId, variantId, quantity: 1 });
  }

  await Wishlist.updateOne(
    { userId },
    { $pull: { items: { variantId } } }
  );

  await cart.save();
  return { message: "Item added to cart" };
};

exports.getCart = async (userId) => {
  const cart = await Cart.findOne({ userId })
    .populate({
      path: "items.productId",
      select: "name brand model images"
    })
    .populate("items.variantId");

  return cart || { userId, items: [] };
};

exports.updateQuantity = async (userId, { variantId, quantity }) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (item) => item.variantId.toString() === variantId
  );
  if (!item) throw new Error("Item not in cart");

  const variant = await Variant.findById(variantId);
  if (!variant || variant.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  item.quantity = quantity;
  await cart.save();
  return { message: "Quantity updated" };
};

exports.removeFromCart = async (userId, { variantId }) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { variantId } } },
    { new: true }
  );
  return { message: "Item removed" };
};
