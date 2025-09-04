const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userAddressRoutes = require("./userAddressRoutes");
const userProductRoutes = require("./userProductRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const walletRoutes = require("./walletRoutes");
const profileRoutes = require("./profileRoutes");
const userBrandRoutes = require("./userBrandRoutes");
const paymentRoutes = require("./paymentRoutes");
const couponRoutes = require("./couponRoutes");
const ratingRoutes = require("./ratingRoutes");

router.use("/auth", authRoutes);
router.use("/address", userAddressRoutes);
router.use("/products", userProductRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/wallet", walletRoutes);
router.use("/profile", profileRoutes);
router.use("/brands", userBrandRoutes);
router.use("/payments", paymentRoutes);
router.use("/coupons", couponRoutes);
router.use("/ratings", ratingRoutes);

module.exports = router;
