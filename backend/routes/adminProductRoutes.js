const express = require('express');
const router = express.Router();

const {addProduct}=require('../controllers/adminProductController');
const { upload, resizeAndSaveImages } = require('../middlewares/uploadProductImage');

router.post('/product',  addProduct);


module.exports=router