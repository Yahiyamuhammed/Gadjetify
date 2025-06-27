const Product = require('../models/productModel');
const {deleteProduct,editProduct}=require('../helpers/adminProductHelpers')


exports.addProduct = async (req, res) => {
  
  
//   console.log(req.body,'this is images');
    try {
    // console.log(req.body.images,'this is images');
    
    const newProduct = new Product(req.body);
    const product=await newProduct.save();
    res.status(201).json({ message: 'Product created successfully',productId:product.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};

exports.softDeleteProduct = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted (soft)', product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete', error: err.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    // const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const updated = await editProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated', updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
};