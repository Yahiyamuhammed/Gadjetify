const { getUserWalletHelper, getWalletBalanceHelper } = require('../helpers/walletHelper');

exports.getUserWallet = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await getUserWalletHelper(userId);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getWalletBalanceController = async (req, res) => {
  try {
    const result = await getWalletBalanceHelper(req.user);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};