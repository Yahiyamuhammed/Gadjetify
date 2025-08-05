const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/authMiddleware');
const { placeOrder, getUserOrders, getSingleOrder } = require('../controllers/orderController');

router.post('/order', userAuth, placeOrder);
router.get('/order', userAuth, getUserOrders); 
router.get('/order/:orderId', userAuth, getSingleOrder);
router.patch('/order/:orderId/item/:itemId/request-return', requestReturn);


module.exports = router;
