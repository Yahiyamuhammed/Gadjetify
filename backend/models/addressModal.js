const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  pincode: String,
  locality: String,
  address: String,
  district: String,
  state: String,
  landmark: String,
  alternatePhone: String,
  isPrimary: { type: Boolean, default: false }
})

module.exports = mongoose.model('Address', addressSchema)