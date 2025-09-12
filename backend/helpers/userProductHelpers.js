const Product = require("../models/productModel");
const Brand = require("../models/brandModel");

exports.fetchFilteredProducts = async (query) => {
  const {
    search = "",
    sort = "name_asc",
    brand = "",

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
    const brandDoc = await Brand.findById(brand);

    if (brandDoc) {
      filter.brand = brandDoc._id;
    } else {
      return {
        products: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: parseInt(page),
      };
    }
  }

  let sortOption = {};
  switch ((sort || "").toLowerCase()) {
    case "price_asc":
      sortOption = { "defaultVariant.price": 1 };
      break;
    case "price_desc":
      sortOption = { "defaultVariant.price": -1 };
      break;
    case "name_desc":
      sortOption.name_lower = -1;
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
      sortOption.name_lower = 1;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const productsAggregation = await Product.aggregate([
    { $match: filter },

    {
      $lookup: {
        from: "variants",
        let: { productId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$productId", "$$productId"] },
              isDefault: true,
            },
          },
          {
            $project: { price: 1, storage: 1, ram: 1, stock: 1, isDefault: 1 },
          },
        ],
        as: "defaultVariant",
      },
    },
    { $unwind: { path: "$defaultVariant", preserveNullAndEmptyArrays: true } },
    { $match: { defaultVariant: { $ne: null } } },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
    { $match: { "brand.isDeleted": false } },
    {
      $addFields: {
        name_lower: { $toLower: "$name" },
      },
    },

    { $sort: sortOption },
    { $skip: skip },
    { $limit: parseInt(limit) },
  ]);

  const totalCount = await Product.countDocuments(filter);

  return {
    products: productsAggregation,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page),
  };
};
