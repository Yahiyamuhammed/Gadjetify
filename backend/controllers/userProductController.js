const mongoose = require("mongoose");
const {fetchFilteredProducts}=require('../helpers/userProductHelpers')
const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    console.log('this is the user data in product',req.user)
    const data = await fetchFilteredProducts(req.query);
    res.status(200).json({...data,user: req.user || null});
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

exports.getSingleProduct = async (req, res,next) => {
  try {
    const { id } = req.params;

    // console.log(id);
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id).populate("brand", "name").lean();

    // console.log(product)

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: 'Product not found or is deleted' });
    }

    // res.status(200).json(product);
    res.product={ ...product }
    next()
  } catch (err) {
    // console.log(err.message)
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};