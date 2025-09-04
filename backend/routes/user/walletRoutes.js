
const express = require('express');
const router = express.Router();
const { getUserWallet } = require('../../controllers/walletController');
const checkBlockedUser = require('../../middlewares/checkBlockedUser');

router.get('/', checkBlockedUser, getUserWallet);

module.exports = router;
