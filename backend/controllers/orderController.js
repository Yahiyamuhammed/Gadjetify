const { requestReturnHelper,getUserOrders ,getOrderById ,placeOrder,cancelOrderHelper} = require("../helpers/orderHelper");

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const response = await getUserOrders(userId);
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

    const response = await getOrderById(userId, orderId);
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

    const response = await placeOrder({
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

exports.requestReturn = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { reason } = req.body;
    const userId = req.user._id;

    const response = await requestReturnHelper({ userId, orderId, itemId, reason });

    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id; // assuming you use auth middleware

    const response = await cancelOrderHelper(orderId, userId);

    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};