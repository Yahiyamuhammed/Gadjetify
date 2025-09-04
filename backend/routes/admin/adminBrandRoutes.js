const express = require('express');
const router = express.Router();
const {addBrand,updateBrand,deleteBrand,getBrands,restoreBrand} = require('../controllers/adminBrandControllers');
const adminAuth= require('../middlewares/adminAuth')

router.post('/brands', addBrand);
router.get('/brands',adminAuth, getBrands);
router.put('/brands/:id', updateBrand);
router.patch('/brands/:id/delete', deleteBrand);
router.patch('/brands/:id/restore', restoreBrand);


module.exports = router;