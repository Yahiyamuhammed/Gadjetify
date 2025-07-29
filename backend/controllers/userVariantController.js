const { fetchVariantsForProduct } = require("../helpers/userVariantHelper");

exports.getVariantsByProductId = async (req, res) => {
  try {
    const productId = req.params.id;

    const variants = await fetchVariantsForProduct(productId);

    return res.status(200).json({
      ...res.product,
      variants,
    });
  } catch (error) {
    console.error('Error fetching variants:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
