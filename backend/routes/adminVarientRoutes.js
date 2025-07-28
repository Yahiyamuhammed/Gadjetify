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

router.get("/variants/:productId",adminAuth, getVariantsByProduct);

router.put("/variants/:id",adminAuth, updateVariant);

router.delete("/variants/:id",adminAuth, deleteVariant);

module.exports=  router;
