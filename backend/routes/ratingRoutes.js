const express = require("express");
const router = express.Router();
const {
  rateProduct,
  getUserRating,
} = require("../controllers/ratingController");
const userAuth = require("../middlewares/authMiddleware");

router.post("/variant", userAuth, rateProduct);
router.get("/variant/:variantId", userAuth, getUserRating);

module.exports = router;
