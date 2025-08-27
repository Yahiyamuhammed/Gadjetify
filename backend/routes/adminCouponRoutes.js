const express = require("express");
const {
  createCoupon,
  disableCoupon,
  fetchCoupons,
} = require("../controllers/adminCouponController");
const router = express.Router();

router.post("/admin/coupons", createCoupon);
router.delete("/admin/coupons/:couponId", disableCoupon);
router.get("/admin/coupons", fetchCoupons);

module.exports = router;
