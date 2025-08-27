const Coupon = require("../models/couponModel");

const applyCoupon = async ({ couponCode, cartTotal }) => {
  try {
    const coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return { statusCode: 404, message: "Invalid or inactive coupon" };
    }
    if (coupon.expiryDate < new Date()) {
      return { statusCode: 400, message: "Coupon has expired" };
    }
    if (cartTotal < coupon.minPurchase) {
      return {
        statusCode: 400,
        message: `Minimum purchase of ${coupon.minPurchase} required`,
      };
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (cartTotal * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    const finalTotal = Math.max(cartTotal - discount, 0);

    return {
      statusCode: 200,
      message: "Coupon applied successfully",
      data: {
        discount,
        finalTotal,
      },
    };
  } catch (error) {
    return { statusCode: 500, message: "Error applying coupon", error };
  }
};

const removeCoupon = async ({ cartTotal }) => {
  try {
    return {
      statusCode: 200,
      message: "Coupon removed successfully",
      data: {
        finalTotal: cartTotal,
      },
    };
  } catch (error) {
    return { statusCode: 500, message: "Error removing coupon", error };
  }
};

module.exports = {
  applyCoupon,
  removeCoupon,
};
