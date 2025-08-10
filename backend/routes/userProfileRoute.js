const express = require('express');
const router = express.Router();
const checkBlockedUser = require("../middlewares/checkBlockedUser");
const { updateProfile } = require('../controllers/userProfileController');

// router.put("/edit", checkBlockedUser, updateProfile);
// GET profile
router.get('/profile', profileController.getProfile);

// PATCH profile (update name and/or email)
router.patch('/profile', profileController.updateProfile);

// POST verify email OTP
router.post('/profile/email/verify', profileController.verifyEmailOtp);


module.exports=  router;
