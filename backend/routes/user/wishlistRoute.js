const express = require('express');
const router = express.Router();
const { getWishlist,toggleWishlistItem ,removeFromWishlist,clearWishlist} = require('../../controllers/wishlistController');
const userAuth = require('../../middlewares/authMiddleware')


router.get('/', getWishlist);
router.post('/toggle', toggleWishlistItem);
router.delete('/remove', removeFromWishlist);
router.delete('/clear', clearWishlist);

module.exports = router;
