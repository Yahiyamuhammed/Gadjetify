const express = require("express");
const router = express.Router();
const { createPayment, paymentSuccess, retryPayment,paymentFailed } = require("../../controllers/paymentController");

router.post("/", createPayment);
router.post("/success", paymentSuccess);
router.post("/failed", paymentFailed);
router.post("/retry", retryPayment);

module.exports = router;
