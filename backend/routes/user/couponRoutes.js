const express = require("express");
const {
  applyCoupon,
  removeCoupon,
} = require("../controllers/couponController");
const router = express.Router();

router.post("/coupon/apply", applyCoupon);
router.post("/coupon/remove", removeCoupon);

module.exports = router;
