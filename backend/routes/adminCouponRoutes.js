const express = require("express");
const {
  createCoupon,
  disableCoupon,
  fetchCoupons,
} = require("../controllers/adminCouponController");
const router = express.Router();

router.post("/coupons", createCoupon);
router.delete("/coupons/:couponId", disableCoupon);
router.get("/coupons", fetchCoupons);

module.exports = router;
