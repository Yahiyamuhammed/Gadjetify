const User = require('../models/userModal');
const checkBlockedUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(); // Not logged in → proceed

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user && user.status === "blocked") {
      return res.status(403).json({ message: "User is blocked" });
    }

    req.user = user; // optional, for UI logic
    next();
  } catch (err) {
    next(); // Token invalid → treat as guest
  }
};

module.exports = checkBlockedUser;
