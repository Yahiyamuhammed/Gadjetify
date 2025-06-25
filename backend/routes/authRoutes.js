const express = require('express');
const router=express.Router()
const {signup} =require('../controllers/authController')

router.post('/signup',signup, (req, res) => {
    console.log('enterd auth foloder');
    
  res.send('API is working 🚀');
});

module.exports=router