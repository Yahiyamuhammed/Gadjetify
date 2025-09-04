const express = require('express');
const router = express.Router();
const {addBrand,updateBrand,deleteBrand,getBrands,restoreBrand} = require('../../controllers/adminBrandControllers');
const adminAuth= require('../../middlewares/adminAuth')

router.post('/', addBrand);
router.get('/',adminAuth, getBrands);
router.put('/:id', updateBrand);
router.patch('/:id/delete', deleteBrand);
router.patch('/:id/restore', restoreBrand);


module.exports = router;