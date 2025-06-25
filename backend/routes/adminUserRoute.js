const express = require('express')
const router=express.Router()

const {getAllUsers,blockUnblockUser}=require('../controllers/adminUserController')

router.get('/users',getAllUsers)
router.patch('/users/:id/block-toggle',blockUnblockUser)
module.exports=router