const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/userProductController');

router.get('/products', getAllProducts);

module.exports = router;
