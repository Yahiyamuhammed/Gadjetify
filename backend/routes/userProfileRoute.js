const express = require('express');
const router = express.Router();
const checkBlockedUser = require("../middlewares/checkBlockedUser");
const { updateProfile } = require('../controllers/userProfileController');

router.put("/edit", checkBlockedUser, updateProfile);

module.exports=  router;
