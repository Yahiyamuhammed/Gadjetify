const express = require("express");
const router = express.Router();
const { createPayment, paymentSuccess, retryPayment,paymentFailed, verifyPayment } = require("../../controllers/paymentController");

router.post("/", createPayment);
router.post("/success", paymentSuccess);
router.post("/failed", paymentFailed);
router.post("/retry", retryPayment);
router.get('/status',verifyPayment)

module.exports = router;
