const express = require('express');
const { getUserBrands } = require('../controllers/userBrandController');
const router = express.Router();

router.get('/user/brands', getUserBrands);
