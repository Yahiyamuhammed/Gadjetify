const express = require("express");
const {
  getSummary,
  getSalesReport,
  getTopProducts,
} = require("../controllers/adminDashboardController");
const router = express.Router();

router.get("/dashboard/summary", getSummary);
router.get("/dashboard/sales", getSalesReport);
router.get("/dashboard/bestsellers/products", getTopProducts);

module.exports = router;
