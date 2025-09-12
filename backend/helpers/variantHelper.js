// import Variant from '../models/variantModel.js';
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
exports.getVariants = async ({ productId = null, page = 1, limit = 10 }) => {
  try {
    let filter = {};
    if (productId) {
      filter.product = productId;
    }

    // Convert to numbers (in case frontend sends strings)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    // Count total documents
    const total = await Variant.countDocuments(filter);

    // Get paginated variants
    const variants = await Variant.find(filter)
      .populate("productId")
      .sort({ updatedAt: 1 })
      .skip(skip)
      .limit(limit);

    return {
      status: 200,
      message: "variants fetched",
      data: variants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
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
