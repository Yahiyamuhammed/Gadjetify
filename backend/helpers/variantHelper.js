const Variant = require("../models/variantModel");

exports.createVariant = async (data) => {
  const existingVariants = await Variant.find({ productId: data.productId });

  const variant = new Variant({
    ...data,
    isDefault: existingVariants.length === 0,
  });

  await variant.save();
  return variant;
};

exports.updateVariant = async (variantId, updates) => {
  return await Variant.findByIdAndUpdate(variantId, updates, { new: true });
};

exports.deleteVariant = async (variantId) => {
  const variant = await Variant.findById(variantId);
  if (!variant) throw new Error("Variant not found");

  const productId = variant.productId;
  const isDefault = variant.isDefault;

  variant.isDeleted = true;
  variant.isDefault = false;
  await variant.save();

  if (isDefault) {
    const remaining = await Variant.find({
      productId,
      isDeleted: false,
    }).sort({ createdAt: 1 });

    if (remaining.length > 0) {
      remaining[0].isDefault = true;
      await remaining[0].save();
    }
  }

  return true;
};

exports.getVariants = async ({
  productId = null,
  page = 1,
  limit = 10,
  search,
}) => {
  try {
    let filter = {};
    if (productId) {
      filter.product = productId;
    }

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Variant.countDocuments(filter);

    const result = await Variant.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productId",
        },
      },
      {
        $unwind: {
          path: "$productId",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: search
          ? { "productId.name": { $regex: search, $options: "i" } }
          : {},
      },
      {
        $facet: {
          data: [
            { $sort: { updatedAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const variants = result[0].data;
    const totalCount = result[0].totalCount[0]?.count || 0;

    console.log(variants);

    return {
      status: 200,
      message: "variants fetched",
      data: variants,
      pagination: {
        totalCount,
        page,
        pages: Math.ceil(totalCount / limit),
        limit,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching variants",
      error: error.message,
    };
  }
};
