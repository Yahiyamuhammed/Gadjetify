import express from "express";
const router = express.Router();
import { updateProfile } from "../controllers/userController.js";
const checkBlockedUser = require("../middlewares/checkBlockedUser");

router.put("/edit", checkBlockedUser, updateProfile);

export default router;
