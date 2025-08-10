const { getProfile,updateProfile,verifyEmailOtp } = require('../helpers/userProfileHelper');


exports.getProfile = async (req, res) => {
    try {
        const response = await getProfile(req.user.id);
        return res.status(response.status).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const response = await updateProfile(req.user.id, name, email);
        return res.status(response.status).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'Server error' });
    }
};


exports.verifyEmailOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const response = await verifyEmailOtp(req.user.id, otp);
        return res.status(response.status).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'Server error' });
    }
};
