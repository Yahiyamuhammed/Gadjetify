const express = require("express");
const router = express.Router();
const {
  rateProduct,
  getUserRating,
} = require("../../controllers/ratingController");
const userAuth = require("../../middlewares/authMiddleware");

router.post("/", userAuth, rateProduct);
router.get("/:variantId", userAuth, getUserRating);

module.exports = router;
