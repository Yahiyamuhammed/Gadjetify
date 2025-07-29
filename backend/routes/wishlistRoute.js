const express = require('express');
const router = express.Router();
const { getWishlist,toggleWishlistItem ,removeFromWishlist,clearWishlist} = require('../controllers/wishlistController');
const userAuth = require('../middlewares/authMiddleware')

router.use(userAuth);

router.get('/wishlist', getWishlist);
router.post('/wishlist-toggle', toggleWishlistItem);
router.delete('/wishlist-remove', removeFromWishlist);
router.delete('/wishlist-clear', clearWishlist);

module.exports = router;
