const Product = require("../models/productModel");
const Brand = require("../models/brandModel");

const mongoose = require("mongoose");

exports.fetchFilteredProducts = async (query) => {
  const {
    search = "",
    sort = "name_asc",
    brand = "",
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = query;

  const filter = {
    isDeleted: false,
    isListed: true,
  };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (brand) {
    console.log(brand);
    const brandDoc = await Brand.findById(brand);
    console.log(brandDoc);
    if (brandDoc) {
      filter.brand = brandDoc;
    } else {
      return {
        products: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: parseInt(page),
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
  switch ((sort || "").toLowerCase()) {
    case "price_asc":
      sortOption.price = 1;
      break;
    case "price_desc":
      sortOption.price = -1;
      break;
    case "name_desc":
      sortOption.name = -1;
      break;
    case "latest":
      sortOption.createdAt = -1;
      break;
    case "oldest":
      sortOption.createdAt = 1;
      break;
    case "offer_desc":
      sortOption.offerPercentage = -1;
      break;
    case "name_asc":
    default:
      sortOption.name = 1;
  }

  // console.log(sortOption);

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .populate("brand", "name")
      .collation({ locale: "en", strength: 2 })
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit)),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page),
  };
};
