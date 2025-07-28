const User = require('../models/userModal');
const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "User not found" });
    if (user.status === "blocked") {
      return res.status(403).json({ message: "User is blocked" });
    };

    req.user = user; // attach to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token",error:err });
  }
};

module.exports = authMiddleware;
