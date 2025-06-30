const mongoose = require("mongoose");
const Brand = require("../models/brandModel");

const Product = require("../models/productModel");
exports.deleteProduct = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw { status: 400, message: "Invalid user ID format" };
    }
    const product = await Product.findById(userId);

    if (!product) {
      throw { status: 404, message: "Product not found" };
    }

    if (product.isDeleted) {
      throw { status: 400, message: "Product already deleted" };
    }

    product.isDeleted = true;
    await product.save();
    return product

  } catch (err) {
    throw {status:500,message:err.message}
  }
};
exports.editProduct = async (id, data) => {
  if (data.brand) {
    if (!mongoose.Types.ObjectId.isValid(data.brand)) {
      throw new Error('Invalid brand ID');
    }

    const existingBrand = await Brand.findOne({ _id: data.brand, isDeleted: false });
    if (!existingBrand) {
      throw new Error('Brand does not exist or is deleted');
    }
  }
  return await Product.findByIdAndUpdate(id, data, { new: true });
};