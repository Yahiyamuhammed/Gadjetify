const {createBrand,editBrand,softDeleteBrand,getAllBrands,restoreBrand} = require("../helpers/adminBrandHelpers");

exports.addBrand = async (req, res) => {
  try {
    // console.log(req.body);
    
    const brand = await createBrand(req.body);
    res.status(201).json({ message: "Brand added", brand });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const brand = await editBrand(req.params.id, req.body);
    res.status(200).json({ message: "Brand updated", brand });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await softDeleteBrand(req.params.id);
    res.status(200).json({ message: "Brand soft-deleted", brand });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.restoreBrand = async (req, res) => {
  try {
    const brand = await restoreBrand(req.params.id);
    res.status(200).json({ message: "Brand restored", brand });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getBrands = async (req, res) => {
  try {
    const includeDeleted = req.query.includeDeleted === "true";
    const brands = await getAllBrands(includeDeleted,req.query);
    res.status(200).json(brands);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch brands", error: err.message });
  }
};
