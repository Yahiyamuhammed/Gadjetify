const express = require("express");
const {
  fetchSummary,
  fetchSalesReport,
  fetchTopProducts,
  fetchTopBrands,
} = require("../../controllers/adminDashboardController");
const router = express.Router();

router.get("/summary", fetchSummary);
router.get("/sales", fetchSalesReport);
router.get("/bestsellers/products", fetchTopProducts);
router.get("/bestsellers/brands", fetchTopBrands);

module.exports = router;
