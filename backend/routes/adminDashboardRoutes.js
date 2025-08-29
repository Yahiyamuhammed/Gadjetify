const express = require("express");
const { getSummary } = require("../controllers/adminDashboardController");
const router = express.Router();

router.get("/dashboard/summary", getSummary);

module.exports = router;
