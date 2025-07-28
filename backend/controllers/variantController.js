// import * as variantHelper from '../helpers/variantHelper.js';
const { createVariant,updateVariant,deleteVariant,getVariantsByProduct}=require('../helpers/variantHelper')

exports.createVariant = async (req, res) => {
  try {
    const variant = await createVariant(req.body);
    res.status(201).json(variant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const updated = await updateVariant(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    await deleteVariant(req.params.id);
    res.json({ message: 'Variant deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVariantsByProduct = async (req, res) => {
  try {
    const variants = await getVariantsByProduct(req.params.productId);
    res.json(variants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
