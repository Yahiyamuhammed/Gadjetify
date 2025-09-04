const express = require("express");
const { getSalesReport } = require("../../controllers/adminReportController");
const router = express.Router();

router.get("/sales-report", getSalesReport);

module.exports = router;
