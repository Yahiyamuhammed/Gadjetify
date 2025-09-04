const express = require('express');
const router = express.Router();
const checkBlockedUser = require("../../middlewares/checkBlockedUser");
const { getProfile,updateProfile,verifyEmailOtp} = require('../../controllers/userProfileController');

// router.put("/edit", checkBlockedUser, updateProfile);

router.get('/',checkBlockedUser, getProfile);
router.patch('/',checkBlockedUser, updateProfile);
router.post('/email/verify',checkBlockedUser, verifyEmailOtp);


module.exports=  router;
