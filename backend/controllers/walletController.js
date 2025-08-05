const { getUserWalletHelper } = require('../helpers/walletHelper');

exports.getUserWallet = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await getUserWalletHelper(userId);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};