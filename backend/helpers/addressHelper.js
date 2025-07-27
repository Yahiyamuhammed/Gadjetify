const User = require('../models/userModel') 

exports.addAddress = async (userId, addressData) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')

  const isFirst = user.addresses.length === 0
  const newAddress = { ...addressData, isPrimary: isFirst }
  user.addresses.push(newAddress)
  await user.save()
  return newAddress
}

exports.editAddress = async (addressId, data, userId) => {
  const user = await User.findById(userId)
  const address = user.addresses.id(addressId)
  if (!address) throw new Error('Address not found')

  Object.assign(address, data)
  await user.save()
  return address
}

exports.deleteAddress = async (addressId, userId) => {
  const user = await User.findById(userId)
  user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId)
  await user.save()
}

exports.setPrimaryAddress = async (userId, addressId) => {
  const user = await User.findById(userId)
  user.addresses.forEach(addr => {
    addr.isPrimary = addr._id.toString() === addressId
  })
  await user.save()
  return user.addresses.id(addressId)
}

exports.getUserAddresses = async (userId) => {
  const user = await User.findById(userId)
  return user.addresses
}
