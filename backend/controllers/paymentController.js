// import { createPaymentIntent } from "../helpers/paymentHelper.js";

// import { createPaymentIntent } from "../createPaymentIntent";
const {
  createPaymentIntent,
  retryPayment,
  handlePaymentFailure,
  handlePaymentSuccess,
  getOrderByPaymentIntent,
} = require("../helpers/paymentHelper");

exports.createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      res.status(400).json({ message: "Amount is required" });
    }

    const clientData = await createPaymentIntent(amount);

    res.status(200).json(clientData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    console.log(req.body, "thisi= is sthe id og payment");
    const result = await handlePaymentSuccess(orderId, paymentIntentId);
    console.log(result, "this is the payment succes");
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Payment successful", data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.paymentFailed = async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    const result = await handlePaymentFailure(orderId, paymentIntentId);
    return res.status(200).json({
      success: true,
      message: "Payment marked as failed",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.retryPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const result = await retryPayment(orderId);

    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const userId = req.user;

    const result = await getOrderByPaymentIntent(paymentIntentId, userId);

    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      orderStatus: result.data || null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
