import Variant from '../models/variantModel.js';

export const createVariant = async (data) => {
  const existingVariants = await Variant.find({ productId: data.productId });

  const variant = new Variant({
    ...data,
    isDefault: existingVariants.length === 0 // make default if it's the first
  });

  await variant.save();
  return variant;
};

export const updateVariant = async (variantId, updates) => {
  return await Variant.findByIdAndUpdate(variantId, updates, { new: true });
};

export const deleteVariant = async (variantId) => {
  const variant = await Variant.findById(variantId);
  if (!variant) throw new Error('Variant not found');

  const productId = variant.productId;
  const isDefault = variant.isDefault;

  await Variant.findByIdAndDelete(variantId);

  if (isDefault) {
    const remaining = await Variant.find({ productId }).sort({ createdAt: 1 });
    if (remaining.length > 0) {
      remaining[0].isDefault = true;
      await remaining[0].save();
    }
  }

  return true;
};

export const getVariantsByProduct = async (productId) => {
  return await Variant.find({ productId }).sort({ createdAt: 1 });
};
