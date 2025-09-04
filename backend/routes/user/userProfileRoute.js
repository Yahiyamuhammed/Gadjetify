const express = require('express');
const router = express.Router();
const checkBlockedUser = require("../middlewares/checkBlockedUser");
const { getProfile,updateProfile,verifyEmailOtp} = require('../controllers/userProfileController');

// router.put("/edit", checkBlockedUser, updateProfile);

router.get('/profile',checkBlockedUser, getProfile);
router.patch('/profile',checkBlockedUser, updateProfile);
router.post('/profile/email/verify',checkBlockedUser, verifyEmailOtp);


module.exports=  router;
