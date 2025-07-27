const Address = require('../models/addressModal')
const Brand = require('../models/brandModel');


exports.addAddress = async (userId, data) => {

    console.log('this is the user',userId)
  const isFirst = await Address.countDocuments({ userId }) === 0
  const newAddress = new Address({ ...data, userId, isPrimary: isFirst })
  console.log('this is the object address',newAddress)
  return await newAddress.save()
}

exports.editAddress = async (addressId, data, userId) => {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    data,
    { new: true }
  )
  if (!address) throw new Error('Address not found or unauthorized')
  return address
}

exports.deleteAddress = async (addressId, userId) => {
  const deleted = await Address.findOneAndDelete({ _id: addressId, userId })
  if (!deleted) throw new Error('Address not found or unauthorized')

  // If deleted address was primary, set another one as primary
  if (deleted.isPrimary) {
    const another = await Address.findOne({ userId })
    if (another) {
      another.isPrimary = true
      await another.save()
    }
  }
}

exports.setPrimaryAddress = async (userId, addressId) => {
  const addressToSet = await Address.findOne({ _id: addressId, userId })
  if (!addressToSet) throw new Error('Address not found or unauthorized')

  await Address.updateMany({ userId }, { $set: { isPrimary: false } })
  addressToSet.isPrimary = true
  await addressToSet.save()

  return addressToSet
}

exports.getUserAddresses = async (userId) => {
  return await Address.find({ userId }).sort({ isPrimary: -1, _id: -1 })
}
