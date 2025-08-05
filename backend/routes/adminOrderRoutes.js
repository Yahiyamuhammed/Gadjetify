const express = require('express');
const router = express.Router();
const { approveReturn, getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');
const adminAuth= require('../middlewares/adminAuth')

router.patch('/orders/:orderId/approve-return/:itemId',adminAuth, approveReturn);
router.get('/orders',adminAuth, getAllOrders);
router.patch("/orders/:orderId/status", adminAuth, updateOrderStatus);


module.exports = router;
