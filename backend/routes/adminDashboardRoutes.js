const express = require("express");
const {
  getSummary,
  getSalesReport,
} = require("../controllers/adminDashboardController");
const router = express.Router();

router.get("/dashboard/summary", getSummary);
router.get("/dashboard/sales", getSalesReport);

module.exports = router;
