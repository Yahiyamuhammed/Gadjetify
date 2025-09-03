// import * as variantHelper from '../helpers/variantHelper.js';
const { createVariant,updateVariant,deleteVariant, getVariants}=require('../helpers/variantHelper')

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
    console.log(req.params.id, req.body)
    const updated = await updateVariant(req.params.id, req.body);
    console.log(updated)
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

exports.getVariants = async (req, res) => {
  try {
    const { productId,page,limit,search } = req.query;
        // const { page,limit } = req.body;

    console.log(page,limit)
    const variants = await getVariants({productId,page,limit,search});
    res.status(200).json(variants);
  } catch (err) {
    console.error("Error fetching variants:", err);
    res.status(500).json({ error: "Failed to fetch variants" });
  }
};
