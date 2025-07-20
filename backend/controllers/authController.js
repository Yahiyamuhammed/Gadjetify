const {
  signupUser,
  verifyUserOtp,
  resendUserOtp,
  loginUser,
  googleAuthHandler,
} = require('../helpers/authHelper');

exports.signup = async (req, res) => {
  try {
    const result = await signupUser(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const result = await verifyUserOtp(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const result = await resendUserOtp(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to resend OTP', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const result = await googleAuthHandler(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ message: 'Google Login failed', error: err.message });
  }
};
