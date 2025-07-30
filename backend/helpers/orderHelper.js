const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Variant = require('../models/variantModel');
const Brand = require('../models/brandModel');
const Order = require('../models/orderModel');


exports.getUserOrders = async (userId) => {
  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .select('-__v');

  return {
    status: 200,
    message: 'Orders fetched successfully',
    data: orders
  };
};

exports.getOrderById = async (userId, orderId) => {
  const order = await Order.findOne({ userId, _id: orderId }).select('-__v');

  if (!order) {
    return { status: 404, message: 'Order not found' };
  }

  return {
    status: 200,
    message: 'Order details fetched successfully',
    data: order
  };
};


exports.placeOrder = async ({ userId, addressId, paymentMethod, items, finalTotal }) => {
  if (!items || items.length === 0) {
    return { status: 400, message: 'No items to order' };
  }

  const itemSnapshots = [];

  for (let item of items) {
    const { productId, variantId, quantity } = item;

    const product = await Product.findById(productId).lean();
    const variant = await Variant.findById(variantId).lean();
    const brand = await Brand.findById(product.brand).lean();

    if (!product || !variant || !brand) {
      return { status: 404, message: 'Product, Variant, or Brand not found' };
    }

    if (variant.stock < quantity) {
      return { status: 400, message: `Not enough stock for ${product.name}` };
    }


    itemSnapshots.push({
      productId,
      productName: product.name,
      brandId: brand._id,
      brandName: brand.name,
      variantId,
      ram: variant.ram,
      storage: variant.storage,
      price: variant.price,
      quantity,
      offerPercentage: product.offerPercentage,
      image: product.images[0] || ''
    });


    await Variant.findByIdAndUpdate(variantId, { $inc: { stock: -quantity } });
  }

  const newOrder = await Order.create({
    userId,
    addressId,
    paymentMethod,
    paymentStatus: paymentMethod === 'COD' ? 'pending' : 'completed',
    items: itemSnapshots,
    finalTotal
  });

  return {
    status: 201,
    message: 'Order placed successfully',
    data: newOrder
  };
};
