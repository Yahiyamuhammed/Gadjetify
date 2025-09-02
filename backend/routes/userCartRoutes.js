const express =require( "express")
const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartCount,
} =require( "../controllers/cartController.js");

const userAuth =require ("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/cart", userAuth, getCart);
router.get("/cart/count", userAuth, getCartCount);
router.post("/cart", userAuth, addToCart);
router.patch("/cart/:variantId", userAuth, updateCartQuantity);
router.delete("/cart/:variantId", userAuth, removeFromCart);

module.exports= router;
