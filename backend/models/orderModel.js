const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  productName: { type: String, required: true },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brand",
  },
  brandName: { type: String, required: true },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Variant",
  },
  ram: Number,
  storage: Number,
  price: Number,
  quantity: Number,
  offerPercentage: Number,
  image: String,
  returnStatus: {
    type: String,
    enum: ["not_requested", "requested", "approved", "rejected", "returned"],
    default: "not_requested",
  },
  returnReason: { type: String },
  returnRequestedAt: { type: Date },
  returnApprovedAt: { type: Date },
  refundAmount: { type: Number },
});

// Snapshot of address during order
const addressSnapshotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    address: { type: String, required: true }, // e.g., Nadapuram, Kozhikode
    district: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String },
  },
  { _id: false }
);

// Snapshot of order summary during order
const summarySnapshotSchema = new mongoose.Schema({
  subtotal: Number,
  totalOfferDiscount: Number,
  customDiscount: Number,
  totalDiscount: Number,
  couponDiscount: Number,
  shipping: Number,
  tax: Number,
  total: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Address",
    },
    addressSnapshot: addressSnapshotSchema,
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "retrying"],
      default: "pending",
    },
    paymentIntentId: String,
    retryAvailableUntil: Date,
    items: [orderItemSchema],
    finalTotal: { type: Number, required: true },
    summary: summarySnapshotSchema,
    status: { type: String, default: "placed" },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
