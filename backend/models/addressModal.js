const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  locality: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  landmark: String,
  alternatePhone: String,
  isPrimary: { type: Boolean, default: false, },
  addressType: {type: String,required: true,enum: ["home", "office"],default: "home"},
});

module.exports = mongoose.model("Address", addressSchema);
