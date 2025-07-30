const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  productName: { type: String, required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand' },
  brandName: { type: String, required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Variant' },
  ram: Number,
  storage: Number,
  price: Number, 
  quantity: Number,
  offerPercentage: Number,
  image: String
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    addressId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Address' },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'pending' },
    items: [orderItemSchema],
    finalTotal: { type: Number, required: true },
    status: { type: String, default: 'placed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
