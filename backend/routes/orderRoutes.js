const express = require('express');
const router = express.Router();
const userAuth =require ("../middlewares/authMiddleware");
const { placeOrder } = require('../controllers/orderController');


router.post('/order', userAuth, placeOrder);

module.exports = router;
