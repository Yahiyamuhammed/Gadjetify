const express = require('express');
const router = express.Router();
const { getAllProducts ,getSingleProduct} = require('../controllers/userProductController');
const checkBlockedUser = require('../middlewares/checkBlockedUser');
const { getVariantsByProductId } = require('../controllers/userVariantController');

router.get('/products',checkBlockedUser, getAllProducts);
router.get('/products/:id',checkBlockedUser, getSingleProduct,getVariantsByProductId);


module.exports = router;
