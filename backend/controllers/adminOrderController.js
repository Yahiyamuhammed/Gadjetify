const { approveReturnHelper, getAllOrdersHelper } = require('../helpers/adminOrderHelper');

exports.approveReturn = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const response = await approveReturnHelper({ orderId, itemId });
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const response = await getAllOrdersHelper({ page, limit, search });
    // console.log(response)
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
