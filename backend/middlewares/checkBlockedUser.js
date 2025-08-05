const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const mongoose = require("mongoose");
const checkBlockedUser = async (req, res, next) => {

  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    let user = null;
    try {
      user = await User.findById(decoded.userId);
    } catch (err) {
      console.log("an error occure", err);
    }
    if (user && user.isBlocked === true) {
      console.log("user is blocked");
      return res.status(403).json({ message: "User is blocked" });
    }
    req.user = user; // optional, for UI logic
    next();
  } catch (err) {
    console.log("no token", err);
    next(); // Token invalid → treat as guest
  }
};

module.exports = checkBlockedUser;
