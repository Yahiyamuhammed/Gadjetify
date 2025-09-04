const express = require("express");
const router = express.Router();

const adminAuthRoutes = require("./adminAuthRoutes");
const adminUserRoutes = require("./adminUserRoutes");
const adminProductRoutes = require("./adminProductRoutes");
const adminBrandRoutes = require("./adminBrandRoutes");
const adminVarientRoutes = require("./adminVarientRoutes");
const adminOrderRoutes = require("./adminOrderRoutes");
const adminCouponRoutes = require("./adminCouponRoutes");
const adminReportRoutes = require("./adminReportRoutes");
const adminDashboardRoutes = require("./adminDashboardRoutes");

router.use("/auth", adminAuthRoutes);
router.use("/users", adminUserRoutes);
router.use("/products", adminProductRoutes);
router.use("/brands", adminBrandRoutes);
router.use("/variants", adminVarientRoutes);
router.use("/orders", adminOrderRoutes);
router.use("/coupons", adminCouponRoutes);
router.use("/reports", adminReportRoutes);
router.use("/dashboard", adminDashboardRoutes);

module.exports = router;
