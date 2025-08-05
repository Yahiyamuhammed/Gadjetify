const express = require('express');
const router = express.Router();
const { approveReturn, getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');

router.patch('/orders/:orderId/approve-return/:itemId', approveReturn);
router.get('/orders', getAllOrders);
router.patch("/orders/:orderId/status", verifyAdmin, updateOrderStatus);


module.exports = router;
