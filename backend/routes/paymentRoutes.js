const express = require('express')
const router = express.Router();
const {createPayment} = require('../controllers/paymentController')



router.post("/payment", createPayment);

module.exports= router;
