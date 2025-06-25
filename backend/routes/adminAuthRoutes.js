const express = require('express');
const router = express.Router();
const { adminLogin, createAdmin } = require('../controllers/adminAuthController');

router.post('/login', adminLogin);
router.post('/create', createAdmin); // Only use this manually once

module.exports = router;
