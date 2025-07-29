// import * as cartHelper from "../helpers/cartHelper.js";
const {addToCart,getCart,updateQuantity,removeFromCart} =require('../helpers/cartHelper')
exports.addToCart = async (req, res) => {
  try {
    const response = await addToCart(req.user._id, req.body);
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
