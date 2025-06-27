const express = require('express');
const router = express.Router();

const {addProduct,softDeleteProduct,updateProduct}=require('../controllers/adminProductController');

const { upload, resizeAndSaveImages } = require('../middlewares/uploadProductImage');

router.post('/product',  addProduct);
router.put('/product/:id/update',updateProduct)
router.patch('/product/:id/delete',softDeleteProduct)


module.exports=router