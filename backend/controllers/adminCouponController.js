const {createCoupon,disableCoupon,fetchCoupons,toggleCouponStatus, updateCoupon} = require("../helpers/adminCouponHelper");

// Create
exports.createCoupon = async (req, res) => {
  const result = await createCoupon(req.body);
  return res.status(result.statusCode).json(result);
};

// Disable
exports.disableCoupon = async (req, res) => {
  const result = await disableCoupon(req.params.couponId);
  return res.status(result.statusCode).json(result);
};

exports.updateCoupon = async (req, res) => {
  const result = await updateCoupon(req.params.couponId, req.body);
  return res.status(result.statusCode).json(result);
};

exports.toggleCouponStatus = async (req, res) => {
  const result = await toggleCouponStatus(req.params.couponId);
  return res.status(result.statusCode).json(result);
};

// Fetch
exports.fetchCoupons = async (req, res) => {
  const { page, limit, search } = req.query;
  const result = await fetchCoupons({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    search: search || "",
  });
  return res.status(result.statusCode).json(result);
};
