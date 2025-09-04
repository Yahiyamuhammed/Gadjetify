const express = require("express");
const {
  createCoupon,
  fetchCoupons,
  updateCoupon,
  toggleCouponStatus,
} = require("../../controllers/adminCouponController");
const router = express.Router();

router.post("/coupons", createCoupon);
router.patch("/coupons/:couponId", updateCoupon);
router.patch("/coupons/:couponId/toggle", toggleCouponStatus);
router.get("/coupons", fetchCoupons);

module.exports = router;
