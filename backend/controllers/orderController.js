const orderHelper = require("../helpers/orderHelper");

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const response = await orderHelper.getUserOrders(userId);
    res.status(response.status).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.orderId;

    const response = await orderHelper.getOrderById(userId, orderId);
    res.status(response.status).json({
      message: response.message,
      data: response.data || null,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId, paymentMethod, items, finalTotal } = req.body;

    const response = await orderHelper.placeOrder({
      userId,
      addressId,
      paymentMethod,
      items,
      finalTotal,
    });

    res.status(response.status).json({
      message: response.message,
      data: response.data || null,
    });
  } catch (err) {
    console.error("Order placement failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
