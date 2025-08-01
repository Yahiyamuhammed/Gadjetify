const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Variant = require("../models/variantModel");
const Wishlist = require("../models/wishListModel");

exports.addToCart = async (userId, { productId, variantId }) => {
  const MAX_QUANTITY = 3;

  const product = await Product.findById(productId);
  if (!product || product.isBlocked || !product.isListed) {
    return { status: 400, message: "Product not available" };
  }

  if (product.category?.isBlocked) {
    return { status: 400, message: "Product category is blocked" };
  }

  const variant = await Variant.findById(variantId);
  if (!variant || variant.isDeleted || variant.stock < 1) {
    return { status: 400, message: "Variant not available" };
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

      if (currentQuantity >= MAX_QUANTITY) {
         cart.items[itemIndex].quantity = MAX_QUANTITY;
      await cart.save();
      return {
        status: 409,
        message: `Maximum quantity (${MAX_QUANTITY}) reached for this item`,
      };
    }

    const newQuantity = Math.min(currentQuantity + 1, variant.stock, MAX_QUANTITY);
    cart.items[itemIndex].quantity = newQuantity;

  } else {
    cart.items.push({ productId, variantId, quantity: 1 });
  }

  await Wishlist.updateOne(
    { user: userId },
    { $pull: { items: { variant: variantId } } }
  );

  await cart.save();
  return { status: 200, message: "Item added to cart" };
};


// exports.getCart = async (userId) => {
//   const cart = await Cart.findOne({ userId })
//     .populate({
//       path: "items.productId",
//       select: "name brand model images offerPercentage"
//     })
//     .populate("items.variantId");

//   return cart || { userId, items: [] };
// };

exports.getCart = async (userId) => {
  const cart = await Cart.findOne({ userId })
    .populate({
      path: "items.productId",
      select: "name brand model images offerPercentage isListed",
      populate: {
        path: "brand", // This is the nested population
        select: "name isDeleted" // Select brand fields you want to return
      }
    })
    .populate("items.variantId"); // Assuming variantId is already a reference

  return cart || { userId, items: [] };
};


exports.updateQuantity = async (userId, { variantId, quantity }) => {
  const MAX_QUANTITY = 3;

  const cart = await Cart.findOne({ userId });
  if (!cart) return { status: 404, message: "Cart not found" };

  const item = cart.items.find(
    (item) => item.variantId.toString() === variantId
  );
  if (!item) return { status: 404, message: "Item not in cart" };

  const variant = await Variant.findById(variantId);
  if (!variant) return { status: 400, message: "Variant not found" };

  const cappedQuantity = Math.min(quantity, variant.stock, MAX_QUANTITY);

  if (item.quantity !== cappedQuantity) {
    item.quantity = cappedQuantity;
    await cart.save();

    if (quantity > MAX_QUANTITY) {
      return {
        status: 200,
        message: `Maximum limit is ${MAX_QUANTITY}. Quantity reset.`,
      };
    }

    if (quantity > variant.stock) {
      return {
        status: 200,
        message: "Quantity reduced to match available stock",
      };
    }

    return { status: 200, message: "Quantity updated" };
  }

  return { status: 200, message: "Quantity unchanged" };
};

exports.removeFromCart = async (userId, { variantId }) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { variantId } } },
    { new: true }
  );
  return { message: "Item removed" };
};
