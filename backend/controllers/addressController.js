const {
  addAddress,
  editAddress,
  deleteAddress,
  getUserAddresses,
  setPrimaryAddress,
} = require("../helpers/addressHelper");

exports.addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const address = await addAddress(userId, req.body);
    res.status(201).json({ success: true, address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.editAddress = async (req, res) => {
  try {
    const address = await editAddress(
      req.params.addressId,
      req.body,
      req.user._id
    );
    res.json({ success: true, address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await deleteAddress(req.params.addressId, req.user._id);
    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.setPrimaryAddress = async (req, res) => {
  try {
    const address = await setPrimaryAddress(req.user._id, req.params.addressId);
    res.json({
      success: true,
      message: "Primary address set",
      address: address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getAddresses = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const addresses = await getUserAddresses(req.user._id, limit);
    res.json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
