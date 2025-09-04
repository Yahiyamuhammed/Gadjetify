const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userAddressRoutes = require("./userAddressRoutes");
const userProductRoutes = require("./userProductRoutes");
const wishlistRoutes = require("./wishlistRoute");
const cartRoutes = require("./userCartRoutes");
const orderRoutes = require("./orderRoutes");
const walletRoutes = require("./walletRoutes");
const profileRoutes = require("./userProfileRoute");
const userBrandRoutes = require("./userBrandRoutes");
const paymentRoutes = require("./paymentRoutes");
const couponRoutes = require("./couponRoutes");
const ratingRoutes = require("./ratingRoutes");

router.use("/auth", authRoutes);
router.use("/address", userAddressRoutes);
router.use("/products", userProductRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/wallet", walletRoutes);
router.use("/profile", profileRoutes);
router.use("/brands", userBrandRoutes);
router.use("/payment", paymentRoutes);
router.use("/coupon", couponRoutes);
router.use("/rating", ratingRoutes);

module.exports = router;
