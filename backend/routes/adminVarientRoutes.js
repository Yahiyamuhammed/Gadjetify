const express = require('express');
const router=express.Router()

const {
  createVariant,
  updateVariant,
  deleteVariant,
  getVariantsByProduct,
}= require ("../controllers/variantController.js")

const adminAuth =require( "../middlewares/adminAuth.js")


router.post("/variants",adminAuth, createVariant);

router.get("/variants/product/:productId",adminAuth, getVariantsByProduct);

router.put("/variants/:id",adminAuth, updateVariant);

router.patch("/variants/:id/delete",adminAuth, deleteVariant);

module.exports=  router;
