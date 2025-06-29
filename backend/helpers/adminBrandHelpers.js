const Brand = require('../models/brandModel');

exports.createBrand = async (data) => {
    // console.log(data);
    
  const existing = await Brand.findOne({ name: data.name });
  if (existing) {
    throw new Error(existing.isDeleted
      ? 'Brand was deleted earlier. Restore it instead.'
      : 'Brand with this name already exists.');
  }
  return await Brand.create(data);
};


exports.editBrand = async (id, data) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new Error('Brand not found');
  if (brand.isDeleted) throw new Error('Cannot update a deleted brand');

  return await Brand.findByIdAndUpdate(id, data, { new: true });
};


exports.softDeleteBrand = async (id) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new Error('Brand not found');
  if (brand.isDeleted) throw new Error('Brand is already deleted');

  return await Brand.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};


exports.restoreBrand = async (id) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new Error('Brand not found');
  if (!brand.isDeleted) throw new Error('Brand is not deleted');

  return await Brand.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
};


exports.getAllBrands = async (includeDeleted = false) => {
//   const filter = includeDeleted ? {} : { isDeleted: false };
  return await Brand.find().sort({ createdAt: -1 });
};
