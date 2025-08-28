const Coupon = require("../models/couponModel");

// Create coupon
exports.createCoupon = async (data) => {
  try {
    const existing = await Coupon.findOne({ code: data.code.toUpperCase() });
    if (existing) {
      return { statusCode: 400, message: "Coupon code already exists" };
    }

    const coupon = new Coupon({
      code: data.code,
      discountType: data.discountType,
      discountValue: data.discountValue,
      minPurchase: data.minPurchase || 0,
      expiryDate: data.expiryDate,
    });

    await coupon.save();
    return {
      statusCode: 201,
      message: "Coupon created successfully",
      data: coupon,
    };
  } catch (error) {
    return { statusCode: 500, message: "Error creating coupon", error };
  }
};

exports.toggleCouponStatus = async (couponId) => {
  try {
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return { statusCode: 404, message: "Coupon not found" };
    }
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    return {
      statusCode: 200,
      message: `Coupon ${
        coupon.isActive ? "activated" : "disabled"
      } successfully`,
      data: coupon,
    };
  } catch (error) {
    return { statusCode: 500, message: "Error toggling coupon status", error };
  }
};

exports.updateCoupon = async (couponId, data) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(couponId, data, {
      new: true,
    });
    if (!coupon) {
      return { statusCode: 404, message: "Coupon not found" };
    }
    return {
      statusCode: 200,
      message: "Coupon updated successfully",
      data: coupon,
    };
  } catch (error) {
    return { statusCode: 500, message: "Error updating coupon", error };
  }
};

// Fetch coupons (with search + pagination)
exports.fetchCoupons = async ({ page = 1, limit = 10, search = "" }) => {
  try {
    const query = {
      code: { $regex: search, $options: "i" },
    };

    const total = await Coupon.countDocuments(query);
    const coupons = await Coupon.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      statusCode: 200,
      message: "Coupons fetched successfully",
      data: coupons,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return { statusCode: 500, message: "Error fetching coupons", error };
  }
};
