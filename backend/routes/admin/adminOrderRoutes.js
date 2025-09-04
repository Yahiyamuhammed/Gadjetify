const express = require('express');
const router = express.Router();
const { approveReturn, getAllOrders, updateOrderStatus } = require('../../controllers/adminOrderController');
const adminAuth= require('../../middlewares/adminAuth')

router.patch('/:orderId/approve-return/:itemId',adminAuth, approveReturn);
router.get('',adminAuth, getAllOrders);
router.patch("/:orderId/status", adminAuth, updateOrderStatus);


module.exports = router;
