const express = require("express");
const router = express.Router();

const adminAuthRoutes = require("./adminAuthRoutes");
const adminUserRoutes = require("./adminUserRoute");
const adminProductRoutes = require("./adminProductRoutes");
const adminBrandRoutes = require("./adminBrandRoutes");
const adminVarientRoutes = require("./adminVarientRoutes");
const adminOrderRoutes = require("./adminOrderRoutes");
const adminCouponRoutes = require("./adminCouponRoutes");
const adminReportRoutes = require("./adminReportRoutes");
const adminDashboardRoutes = require("./adminDashboardRoutes");
const adminAuth=require('../../middlewares/adminAuth')


router.use("/auth", adminAuthRoutes);
router.use("/users",adminAuth, adminUserRoutes);
router.use("/product",adminAuth, adminProductRoutes);
router.use("/brands",adminAuth, adminBrandRoutes);
router.use("/variants",adminAuth, adminVarientRoutes);
router.use("/orders",adminAuth, adminOrderRoutes);
router.use("/coupons",adminAuth, adminCouponRoutes);
router.use("/reports",adminAuth, adminReportRoutes);
router.use("/dashboard",adminAuth, adminDashboardRoutes);

module.exports = router;
