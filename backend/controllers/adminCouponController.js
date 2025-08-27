const {createCoupon,disableCoupon,fetchCoupons} = require("../helpers/adminCouponHelper");

// Create
const createCoupon = async (req, res) => {
  const result = await createCoupon(req.body);
  return res.status(result.statusCode).json(result);
};

// Disable
const disableCoupon = async (req, res) => {
  const result = await disableCoupon(req.params.couponId);
  return res.status(result.statusCode).json(result);
};

// Fetch
const fetchCoupons = async (req, res) => {
  const { page, limit, search } = req.query;
  const result = await fetchCoupons({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    search: search || "",
  });
  return res.status(result.statusCode).json(result);
};

module.exports = {
  createCoupon,
  disableCoupon,
  fetchCoupons,
};
