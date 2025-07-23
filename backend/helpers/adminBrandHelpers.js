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


exports.getAllBrands = async (query={}) => {
  const {
    search = "",
    page = 1,
    limit = 10,
  } = query;

  const filter = {};
  
  if (search) {
    filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [brands, totalCount] = await Promise.all([
    Brand.find(filter)
      .collation({ locale: "en", strength: 2 }) // Case-insensitive sorting
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Brand.countDocuments(filter),
  ]);

  return {
    brands,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page),
  };

//   const filter = includeDeleted ? {} : { isDeleted: false };
  // return await Brand.find().sort({ createdAt: -1 });
};
