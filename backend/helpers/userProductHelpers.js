const Product = require("../models/productModel");
const Brand = require("../models/brandModel");

const mongoose = require("mongoose");
const Variant = require("../models/variantModel");

exports.fetchFilteredProducts = async (query) => {
  const {
    search = "",
    sort = "name_asc",
    brand = "",

    page = 1,
    limit = 10,
  } = query;
  console.log(brand);

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
      filter.brand = brandDoc._id;;
    } else {
      return {
        products: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: parseInt(page),
      };
    }
  }

  //   let sortOption = {};
  //   if (sort === 'price_asc') sortOption.price = 1;
  //   else if (sort === 'price_desc') sortOption.price = -1;
  //   else if (sort === 'name_desc') sortOption.name = -1;
  //   else sortOption.name = 1; // default is name_asc

  let sortOption = {};
  switch ((sort || "").toLowerCase()) {
    case "price_asc":
    sortOption = { "defaultVariant.price": 1 };
      break;
    case "price_desc":
    sortOption = { "defaultVariant.price": -1 };
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

    const productsAggregation = await Product.aggregate([
    { $match: filter },

    // Lookup default variant
    {
      $lookup: {
        from: "variants",
        let: { productId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$productId", "$$productId"] }, isDefault: true } },
          { $project: { price: 1, storage: 1, ram: 1, stock: 1, isDefault: 1 } },
        ],
        as: "defaultVariant",
      },
    },
    { $unwind: { path: "$defaultVariant", preserveNullAndEmptyArrays: true } },
    // Sort based on sortOption
    { $sort: sortOption },

    // Pagination
    { $skip: skip },
    { $limit: parseInt(limit) },

    // Populate brand name
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
  ]);

    const totalCount = await Product.countDocuments(filter);


  return {
    products: productsAggregation,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page),
  };
};
