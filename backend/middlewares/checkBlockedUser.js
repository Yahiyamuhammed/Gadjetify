const jwt = require('jsonwebtoken');
const User = require('../models/userModal');
const mongoose = require('mongoose');
const checkBlockedUser = async (req, res, next) => {
    console.log('entered the check');
    
  const token = req.cookies.token;
  if (!token){ console.log('no token'); return next();} // Not logged in → proceed

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    let user=null;
    try {user = await User.findById(decoded.userId);}catch(err){console.log('an error occure',err)}
    console.log('token found and user is :',user );
    if (user && user.isBlocked === true) {
        console.log('user is blocked');
      return res.status(403).json({ message: "User is blocked" });
    }
    console.log('user verified');
    req.user = decoded.userId; // optional, for UI logic
    next();
  } catch (err) {
    console.log('no token',err);
    next(); // Token invalid → treat as guest
  }
};

module.exports = checkBlockedUser;
