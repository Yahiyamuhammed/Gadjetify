import express from "express";
import {
  createVariant,
  updateVariant,
  deleteVariant,
  getVariantsByProduct,
} from "../controllers/variantController.js";

import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/variants",adminAuth, createVariant);

router.get("/variants/product/:productId",adminAuth, getVariantsByProduct);

router.put("/variants/:id",adminAuth, updateVariant);

router.patch("/variants/:id/delete",adminAuth, deleteVariant);

export default router;
