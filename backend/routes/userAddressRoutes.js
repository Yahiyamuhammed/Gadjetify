const express = require('express')
const router = express.Router()
const addressController = require('../controllers/addressController')
const userAuth = require('../middlewares/userAuth')


router.post('/add-address', userAuth, addressController.addAddress)
router.put('/edit-address/:addressId', userAuth, addressController.editAddress)
router.delete('/delete-address/:addressId', userAuth, addressController.deleteAddress)
router.patch('/set-primary-address/:addressId', userAuth, addressController.setPrimaryAddress)
router.get('/get-all-addresses', userAuth, addressController.getAddresses)

module.exports = router