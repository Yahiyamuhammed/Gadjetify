const express =require( "express")
const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} =require( "../controllers/cartController.js");

const userAuth =require ("../middlewares/authMiddleware");

const router = express.Router();

router.get("/cart", userAuth, getCart);
router.post("/cart", userAuth, addToCart);
router.patch("/cart/:variantId", userAuth, updateCartQuantity);
router.delete("/cart/:variantId", userAuth, removeFromCart);

module.exports= router;
