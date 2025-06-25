const express = require('express');
const router=express.Router()
const {signup,verifyOtp} =require('../controllers/authController')

router.post('/signup',signup, (req, res) => {
    console.log('enterd auth foloder');
    
  res.send('API is working 🚀');
});
router.post('/verify-otp', verifyOtp); // Step 2: Verify OTP and save


module.exports=router