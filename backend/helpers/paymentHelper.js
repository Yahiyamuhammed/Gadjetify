// import Stripe from "stripe";
const Stripe = require("stripe");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", 
      automatic_payment_methods: { enabled: true },
    });

    return paymentIntent.client_secret;
  } catch (err) {
    throw new Error(err.message);
  }
};
