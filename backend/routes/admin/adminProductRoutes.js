const express = require('express');
const router = express.Router();
const adminAuth= require('../../middlewares/adminAuth')
const {addProduct,unListProduct,updateProduct, getProduct,restoreProductController, fetchProducts}=require('../../controllers/adminProductController');

const { upload, resizeAndSaveImages } = require('../../middlewares/uploadProductImage');


router.get('/',adminAuth,  getProduct);
// router.post('/',  addProduct);
router.post('/',upload.array('images', 5),resizeAndSaveImages,addProduct);
router.put('/:id/update',upload.array("images", 5),resizeAndSaveImages,updateProduct)
router.patch('/:id/delete',unListProduct)
router.patch("/:id/restore", restoreProductController);
router.get("/list", fetchProducts);



module.exports=router