const express = require('express');
const router = express.Router();
const { getWishlist,toggleWishlistItem ,removeFromWishlist,clearWishlist} = require('../controllers/wishlistController');
const userAuth = require('../middlewares/authMiddleware')


router.get('/wishlist', userAuth, getWishlist);
router.post('/wishlist/toggle', userAuth, toggleWishlistItem);
router.delete('/wishlist/remove', userAuth, removeFromWishlist);
router.delete('/wishlist/clear', userAuth, clearWishlist);


module.exports = router;
