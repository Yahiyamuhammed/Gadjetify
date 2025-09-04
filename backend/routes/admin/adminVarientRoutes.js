const express = require("express");
const router = express.Router();

const {
  createVariant,
  updateVariant,
  deleteVariant,
  getVariants,
} = require("../../controllers/variantController.js");

const adminAuth = require("../../middlewares/adminAuth.js");

router.post("/variants", adminAuth, createVariant);

router.get("/variants", adminAuth, getVariants);

router.put("/variants/:id", adminAuth, updateVariant);

router.delete("/variants/:id", adminAuth, deleteVariant);

module.exports = router;
