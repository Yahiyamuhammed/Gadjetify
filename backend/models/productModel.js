const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    // brand: String,
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    model: String,
    returnPolicy: String,
    codAvailable: { type: Boolean, default: true },
    warranty: String,
    offerPercentage: { type: Number, default: 0 },
    // images: [String], // filenames or URLs
    images: [
      {
        url: String,
        public_id: String,
        _id: false,
      },
    ],

    isListed: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    avgRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
); // adds createdAt and updatedAt

module.exports = mongoose.model("Product", productSchema);
