const Coupon = require("../models/couponModel");

const applyCouponHelper = async (code) => {
  try {
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return { statusCode: 404, success: false, message: "Invalid or inactive coupon" };
    }

    if (coupon.expiry < new Date()) {
      return { statusCode: 400, success: false, message: "Coupon expired" };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Coupon is valid",
      coupon,
    };
  } catch (err) {
    return { statusCode: 500, success: false, message: "Something went wrong" };
  }
};

const removeCouponHelper = async () => {
  try {
    return {
      statusCode: 200,
      success: true,
      message: "Coupon removed successfully",
    };
  } catch (err) {
    return { statusCode: 500, success: false, message: "Something went wrong" };
  }
};

module.exports = { applyCouponHelper, removeCouponHelper };
