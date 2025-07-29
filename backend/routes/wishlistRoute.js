const express = require('express');
const router = express.Router();
const { verifyUser } = require('../middlewares/authMiddleware');
const { getWishlist,toggleWishlistItem ,removeFromWishlist,clearWishlist} = require('../controllers/wishlistController');

router.use(verifyUser);

router.get('/wishlist', getWishlist);
router.post('/wishlist-toggle', toggleWishlistItem);
router.delete('/wishlist-remove', removeFromWishlist);
router.delete('/wishlist-clear', clearWishlist);

module.exports = router;
