const mongoose = require("mongoose");
const Brand = require("../models/brandModel");

const Product = require("../models/productModel");
exports.unListProduct = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw { status: 400, message: "Invalid user ID format" };
    }
    const product = await Product.findById(userId);

    if (!product) {
      throw { status: 404, message: "Product not found" };
    }

    if (!product.isListed) {
      throw { status: 400, message: "Product already unlisted" };
    }

    product.isListed = false;
    await product.save();
    return product

  } catch (err) {
    throw {status:500,message:err.message}
  }
};
exports.restoreProduct = async (productId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw { status: 400, message: "Invalid product ID format" };
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw { status: 404, message: "Product not found" };
    }

    if (product.isListed) {
      throw { status: 400, message: "Product is already listed" };
    }

    product.isListed = true;
    await product.save();
    return product;

  } catch (err) {
    throw { status: 500, message: err.message };
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

exports.fetchFilteredProducts = async (query) => {
  const {
    search = '',
    sort = 'name_asc',
    brand = '',
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    isDeleted 
  } = query;

  // const filter = {
  //   // isDeleted: false,
  //   // isListed: true
  // };
  const filter={}
  console.log('delted os ',isDeleted);
  
  if (isDeleted === 'true') {
    filter.isListed = false;
  } else if (isDeleted === 'false') {
    filter.isListed = true;
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  if (brand) {
    const brandDoc = await Brand.findOne({ name: { $regex: `^${brand}`, $options: 'i' } });
    if (brandDoc) {
      filter.brand = brandDoc._id;
    } else {
      return {
        products: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: parseInt(page)
      };
    }
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }


//   let sortOption = {};
//   if (sort === 'price_asc') sortOption.price = 1;
//   else if (sort === 'price_desc') sortOption.price = -1;
//   else if (sort === 'name_desc') sortOption.name = -1;
//   else sortOption.name = 1; // default is name_asc

let sortOption = {};
switch ((sort || '').toLowerCase()) {
  case 'price_asc':
    sortOption.price = 1;
    break;
  case 'price_desc':
    sortOption.price = -1;
    break;
  case 'name_desc':
    sortOption.name = -1;
    break;
  case 'name_asc':
  case 'latest':
  default:
    sortOption.updatedAt = -1; // ✅ latest updated first
    break;
}


  console.log(sortOption);
  
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .populate('brand', 'name')
      .collation({ locale: 'en', strength: 2 })
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit)),
    Product.countDocuments(filter)
  ]);

  return {
    products,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page)
  };
};