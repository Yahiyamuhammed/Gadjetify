const express = require("express");
const router = express.Router();
const { createPayment, paymentSuccess, retryPayment,paymentFailed } = require("../controllers/paymentController");

router.post("/payment", createPayment);
router.post("/payment/success", paymentSuccess);
router.post("/payment/failed", paymentFailed);
router.post("/payment/retry", retryPayment);

module.exports = router;
