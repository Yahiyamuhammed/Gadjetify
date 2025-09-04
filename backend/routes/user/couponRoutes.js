const express = require("express");
const {
  applyCoupon,
  removeCoupon,
} = require("../../controllers/couponController");
const router = express.Router();

router.post("/apply", applyCoupon);
router.post("/remove", removeCoupon);

module.exports = router;
