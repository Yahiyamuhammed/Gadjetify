import * as cartHelper from "../helpers/cartHelper.js";

export const addToCart = async (req, res) => {
  try {
    const response = await cartHelper.addToCart(req.user._id, req.body);
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartHelper.getCart(req.user._id);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const response = await cartHelper.updateQuantity(req.user._id, req.body);
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const response = await cartHelper.removeFromCart(req.user._id, req.body);
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
