// import * as cartHelper from "../helpers/cartHelper.js";
const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  getCartItemCount,
} = require("../helpers/cartHelper");
exports.addToCart = async (req, res) => {
  try {
    const response = await addToCart(req.user._id, req.body);
    res
      .status(response.status)
      .json({ message: response.message, quantity: response.quantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await getCart(req.user._id);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const response = await updateQuantity(req.user._id, req.body);
    res.status(response.status).json({ message: response.message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const response = await removeFromCart(req.user._id, req.params);
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCartCount = async (req, res) => {
  try {
    const userId = req.user._id; 
    const count = await getCartItemCount(userId);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart count", error });
  }
};
