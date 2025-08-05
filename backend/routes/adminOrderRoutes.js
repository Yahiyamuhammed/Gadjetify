const express = require('express');
const router = express.Router();
const { approveReturn, getAllOrders } = require('../controllers/adminOrderController');

router.patch('/orders/:orderId/approve-return/:itemId', approveReturn);
router.get('/orders', getAllOrders);

module.exports = router;
