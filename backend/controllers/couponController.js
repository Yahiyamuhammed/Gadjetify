const { applyCouponHelper, removeCouponHelper } = require("../helpers/couponHelper");

const applyCoupon = async (req, res) => {
  try {
    const { code, cart } = req.body; // cart contains {total: number}
    const response = await applyCouponHelper(cart, code);
    return res.status(response.statusCode).json(response);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const removeCoupon = async (req, res) => {
  try {
    const response = await removeCouponHelper();
    return res.status(response.statusCode).json(response);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { applyCoupon, removeCoupon };
