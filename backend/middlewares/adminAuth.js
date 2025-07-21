const jwt = require("jsonwebtoken");

adminAuth = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded.isAdmin) return res.status(403).json({ message: "Forbidden" });

    req.admin = decoded;

    console.log("admin is logged in");
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = adminAuth;
