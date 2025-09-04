const express = require("express");
const router = express.Router();

const {
  createVariant,
  updateVariant,
  deleteVariant,
  getVariants,
} = require("../../controllers/variantController.js");

const adminAuth = require("../../middlewares/adminAuth.js");

router.post("/", adminAuth, createVariant);

router.get("/", adminAuth, getVariants);

router.put("/:id", adminAuth, updateVariant);

router.delete("/:id", adminAuth, deleteVariant);

module.exports = router;
