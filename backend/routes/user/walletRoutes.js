
const express = require('express');
const router = express.Router();
const { getUserWallet, getWalletBalanceController } = require('../../controllers/walletController');
const checkBlockedUser = require('../../middlewares/checkBlockedUser');

router.get('/', checkBlockedUser, getUserWallet);
router.get("/balance", checkBlockedUser, getWalletBalanceController);


module.exports = router;
