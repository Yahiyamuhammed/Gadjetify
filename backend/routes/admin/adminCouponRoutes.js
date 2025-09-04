const express = require("express");
const {
  createCoupon,
  fetchCoupons,
  updateCoupon,
  toggleCouponStatus,
} = require("../../controllers/adminCouponController");
const router = express.Router();

router.post("/", createCoupon);
router.patch("/:couponId", updateCoupon);
router.patch("/:couponId/toggle", toggleCouponStatus);
router.get("/", fetchCoupons);

module.exports = router;
