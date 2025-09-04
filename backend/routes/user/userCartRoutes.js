const express =require( "express")
const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartCount,
} =require( "../../controllers/cartController.js");

const userAuth =require ("../../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", userAuth, getCart);
router.get("/count", userAuth, getCartCount);
router.post("", userAuth, addToCart);
router.patch("/:variantId", userAuth, updateCartQuantity);
router.delete("/:variantId", userAuth, removeFromCart);

module.exports= router;
