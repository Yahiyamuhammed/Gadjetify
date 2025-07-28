import * as variantHelper from '../helpers/variantHelper.js';

export const createVariant = async (req, res) => {
  try {
    const variant = await variantHelper.createVariant(req.body);
    res.status(201).json(variant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVariant = async (req, res) => {
  try {
    const updated = await variantHelper.updateVariant(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVariant = async (req, res) => {
  try {
    await variantHelper.deleteVariant(req.params.id);
    res.json({ message: 'Variant deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getVariantsByProduct = async (req, res) => {
  try {
    const variants = await variantHelper.getVariantsByProduct(req.params.productId);
    res.json(variants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
