const express = require('express');
const router = express.Router();
const { adminLogin, createAdmin } = require('../controllers/adminAuthController');
const adminAuth=require('../middlewares/adminAuth')

router.post('/login', adminLogin);
router.post('/create', createAdmin); // Only use this manually once
router.get('/dashboard', adminAuth, (req, res) => {
  res.json({ message: "Welcome Admin" });
});


module.exports = router;
