const express = require('express');
const router = express.Router();

const {addProduct,unListProduct,updateProduct, getProduct}=require('../controllers/adminProductController');

const { upload, resizeAndSaveImages } = require('../middlewares/uploadProductImage');


router.get('/product',  getProduct);
router.post('/product',  addProduct);
router.put('/product/:id/update',updateProduct)
router.patch('/product/:id/delete',unListProduct)


module.exports=router