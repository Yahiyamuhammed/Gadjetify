const express = require('express');
const router = express.Router();
const { approveReturn, getAllOrders } = require('../controllers/adminOrderController');

router.patch('/order/:orderId/item/:itemId/approve-return', approveReturn);
router.get('/orders', getAllOrders);

module.exports = router;
