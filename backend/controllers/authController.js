const {
  signupUser,
  verifyUserOtp,
  resendUserOtp,
  loginUser,
  googleAuthHandler,
} = require("../helpers/authHelper");

exports.signup = async (req, res) => {
  try {
    const result = await signupUser(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const result = await verifyUserOtp(req.body);
    if (!result.data.token) {
      return res.status(result.status).json(result.data);
    }

    res
      .cookie("token", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(result.status)
      .json({
        message: result.data.message,
        user: result.data.user,
      });
    // res.status(result.status).json(result.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Verification failed", error: err.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const result = await resendUserOtp(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to resend OTP", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    if (!result.data.token) {
      return res.status(result.status).json(result.data);
    }

    res
      .cookie("token", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(result.status)
      .json({
        message: result.data.message,
        user: result.data.user,
      });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const result = await googleAuthHandler(req.body);
    if (!result.data.token) {
      return res.status(result.status).json(result.data);
    }

    res
      .cookie("token", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(result.status)
      .json({
        message: result.data.message,
        user: result.data.user,
      });
    // res.status(result.status).json(result.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Google Login failed", error: err.message });
  }
};
exports.signout = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "User logged out successfully" });
};
exports.me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json(null); // guest user
    }
    const { _id, name, email, isVerified, authType } = req.user;
    const user = { _id, name, email, isVerified, authType };
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
