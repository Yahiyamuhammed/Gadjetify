const express = require('express');
const router = express.Router();
const { adminLogin, createAdmin } = require('../controllers/adminAuthController');
const adminAuth=require('../middlewares/adminAuth')

router.post('/login', adminLogin);
router.post('/create', createAdmin);
router.get('/dashboard', adminAuth, (req, res) => {
  res.json({ message: "Welcome Admin" });
});
router.post('logout')

module.exports = router;
