const express = require('express');
const router = express.Router();
const userAuth = require('../../middlewares/authMiddleware');
const { placeOrder, getUserOrders, getSingleOrder, requestReturn, cancelOrder } = require('../../controllers/orderController');

router.post('/', userAuth, placeOrder);
router.get('/', userAuth, getUserOrders); 
router.get('/:orderId', userAuth, getSingleOrder);
router.patch('/:orderId/return/:itemId', requestReturn);
router.patch('/:orderId/cancel', cancelOrder);



module.exports = router;
