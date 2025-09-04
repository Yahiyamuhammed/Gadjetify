const express = require('express')
const router=express.Router()

const {getAllUsers,blockUnblockUser}=require('../../controllers/adminUserController')
const adminAuth= require('../../middlewares/adminAuth')

router.get('/users',adminAuth,getAllUsers)
router.patch('/users/:id/block-toggle',blockUnblockUser)
module.exports=router