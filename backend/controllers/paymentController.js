// import { createPaymentIntent } from "../helpers/paymentHelper.js";

// import { createPaymentIntent } from "../createPaymentIntent";
const createPaymentIntent = require("../helpers/paymentHelper");


exports.createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      res.status(400).json({ message: "Amount is required" });
    }

    const clientSecret = await createPaymentIntent(amount);

    res.status(200).json({ clientSecret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
