const express = require('express');
const router = express.Router();
const {addBrand,updateBrand,deleteBrand,getBrands,restoreBrand} = require('../controllers/adminBrandControllers');

router.post('/brands', addBrand);
router.get('/brands', getBrands);
router.put('/brands/:id', updateBrand);
router.patch('/brands/:id/delete', deleteBrand);
router.patch('/brands/:id/restore', restoreBrand);


module.exports = router;