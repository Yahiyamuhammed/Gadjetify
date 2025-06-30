const {fetchFilteredProducts}=require('../helpers/userProductHelpers')

exports.getAllProducts = async (req, res) => {
  try {
    const data = await fetchFilteredProducts(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};