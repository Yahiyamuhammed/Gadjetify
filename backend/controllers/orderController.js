const orderHelper = require("../helpers/orderHelper");

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const response = await orderHelper.getUserOrders(userId);
    res.status(response.status).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error",error:err?.message });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const userId = req.user;
    const orderId = req.params.orderId;

    const response = await orderHelper.getOrderById(userId, orderId);
    res.status(response.status).json({
      message: response.message,
      data: response.data || null,
    });
  } catch (err) {
    res.status(500).json({ message:err.message ||  "Internal server error" });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user;

    const { addressId, paymentMethod, items, finalTotal,summary } = req.body;

    const response = await orderHelper.placeOrder({
      userId,
      addressId,
      paymentMethod,
      items,
      finalTotal,
      summary,
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
