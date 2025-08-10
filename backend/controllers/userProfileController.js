const profileHelper = require('../helpers/profileHelper');

// GET profile
exports.getProfile = async (req, res) => {
    try {
        const response = await profileHelper.getProfile(req.user.id);
        return res.status(response.status).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'Server error' });
    }
};

// PATCH profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const response = await profileHelper.updateProfile(req.user.id, name, email);
        return res.status(response.status).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'Server error' });
    }
};

// Verify email OTP
exports.verifyEmailOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const response = await profileHelper.verifyEmailOtp(req.user.id, otp);
        return res.status(response.status).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'Server error' });
    }
};
