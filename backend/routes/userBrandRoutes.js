const express = require('express');
const { getUserBrands } = require('../controllers/userBrandController');
const router = express.Router();

router.get('/brands', getUserBrands);

module.exports = router