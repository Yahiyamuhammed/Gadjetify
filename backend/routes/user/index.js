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

const userAuth = require('../../middlewares/authMiddleware')


router.use("/auth", authRoutes);
router.use("/address",userAuth, userAddressRoutes);
router.use("/products", userProductRoutes);
router.use("/wishlist",userAuth,  wishlistRoutes);
router.use("/cart",userAuth, cartRoutes);
router.use("/order",userAuth, orderRoutes);
router.use("/wallet",userAuth, walletRoutes);
router.use("/profile",userAuth, profileRoutes);
router.use("/brands", userBrandRoutes);
router.use("/payment",userAuth, paymentRoutes);
router.use("/coupon", couponRoutes);
router.use("/rating",userAuth, ratingRoutes);

module.exports = router;
