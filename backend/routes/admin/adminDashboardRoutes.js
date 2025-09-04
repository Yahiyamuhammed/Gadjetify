const express = require("express");
const {
  fetchSummary,
  fetchSalesReport,
  fetchTopProducts,
  fetchTopBrands,
} = require("../../controllers/adminDashboardController");
const router = express.Router();

router.get("/dashboard/summary", fetchSummary);
router.get("/dashboard/sales", fetchSalesReport);
router.get("/dashboard/bestsellers/products", fetchTopProducts);
router.get("/dashboard/bestsellers/brands", fetchTopBrands);

module.exports = router;
