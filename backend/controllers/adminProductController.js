const Product = require('../models/productModel');

// ✅ Create Product
exports.addProduct = async (req, res) => {
  
  
//   console.log(req.body,'this is images');
    try {
    // console.log(req.body.images,'this is images');
    
    const newProduct = new Product({
      ...req.body,
      images: req.body.images
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};