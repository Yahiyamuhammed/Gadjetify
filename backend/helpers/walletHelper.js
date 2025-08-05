const WalletTransaction = require('../models/walletTransactionModel');
const User = require('../models/userModal');

exports.getUserWalletHelper = async (userId) => {
  const user = await User.findById(userId).select('wallet');
  if (!user) return { status: 404, message: 'User not found' };

  const transactions = await WalletTransaction.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return {
    status: 200,
    message: 'Wallet data fetched',
    data: {
      balance: user.wallet || 0,
      transactions,
    },
  };
};
