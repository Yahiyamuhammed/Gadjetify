const Order = require("../models/orderModel");
const Stripe = require("stripe");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", 
      automatic_payment_methods: { enabled: true },
    });

    return {client_secret:paymentIntent.client_secret,paymentIntentId:paymentIntent.id};
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.handlePaymentSuccess = async (orderId, paymentIntentId) => {
  return await Order.findByIdAndUpdate(orderId, {
    paymentStatus: "paid",
    paymentIntentId,
  }, { new: true });
};

exports.handlePaymentFailure = async (orderId, paymentIntentId) => {
  
  return await Order.findByIdAndUpdate(orderId, {
    paymentStatus: "failed",
    paymentIntentId,
    retryAvailableUntil: Date.now() + 15 * 60 * 1000 
  }, { new: true });
};

exports.retryPayment = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");
  if (Date.now() > order.retryAvailableUntil) throw new Error("Retry window expired");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalAmount * 100,
    currency: "usd",
    metadata: { orderId },
  });

  order.paymentIntentId = paymentIntent.id;
  order.paymentStatus = "retrying";
  await order.save();

  return { clientSecret: paymentIntent.client_secret };
};