const express = require('express');
const router = express.Router();
const { getAllProducts ,getSingleProduct} = require('../controllers/userProductController');
const checkBlockedUser = require('../middlewares/checkBlockedUser');

router.get('/products',checkBlockedUser, getAllProducts);
router.get('/products/:id',checkBlockedUser, getSingleProduct);


module.exports = router;
