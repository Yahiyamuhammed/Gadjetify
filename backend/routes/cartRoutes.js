import express from "express";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../controllers/cartController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/cart", userAuth, getCart);
router.post("/cart", userAuth, addToCart);
router.patch("/cart/:variantId", userAuth, updateCartQuantity);
router.delete("/cart/:variantId", userAuth, removeFromCart);

export default router;
