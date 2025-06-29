const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  // brand: String,
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  model: String,
  returnPolicy: String,
  codAvailable: { type: Boolean, default: true },
  warranty: String,
  offerPercentage: { type: Number, default: null },
  images: [String], // filenames or URLs
  isListed: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('Product', productSchema);