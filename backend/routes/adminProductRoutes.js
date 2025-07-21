const express = require('express');
const router = express.Router();
const adminAuth= require('../middlewares/adminAuth')
const {addProduct,unListProduct,updateProduct, getProduct,restoreProductController}=require('../controllers/adminProductController');

const { upload, resizeAndSaveImages } = require('../middlewares/uploadProductImage');


router.get('/product',adminAuth,  getProduct);
// router.post('/product',  addProduct);
router.post('/product',upload.array('images', 5),resizeAndSaveImages,addProduct);
router.put('/product/:id/update',updateProduct)
router.patch('/product/:id/delete',unListProduct)
router.patch("/product/:id/restore", restoreProductController);


module.exports=router