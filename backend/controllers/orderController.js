const orderHelper = require('../helpers/orderHelper');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.userId; 
    const { addressId, paymentMethod, items, finalTotal } = req.body;

    const response = await orderHelper.placeOrder({
      userId,
      addressId,
      paymentMethod,
      items,
      finalTotal
    });

    res.status(response.status).json({
      message: response.message,
      data: response.data || null
    });
  } catch (err) {
    console.error('Order placement failed:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
