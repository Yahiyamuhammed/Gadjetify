const express = require("express");
const router = express.Router();
const {
  signup,
  verifyOtp,
  login,
  resendOtp,
  googleLogin,
  signout,
  me,
} = require("../controllers/authController");
const checkBlockedUser = require("../middlewares/checkBlockedUser");

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/signout", signout);
router.get("/me", checkBlockedUser, me);

module.exports = router;
