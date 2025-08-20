import { createPaymentIntent } from "../helpers/paymentHelper.js";

export const createPayment = async (req, res) => {
  try {
    const { amount } = req.body; // in cents, e.g., 2000 = $20
    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const clientSecret = await createPaymentIntent(amount);

    return res.status(200).json({ clientSecret });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
