const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (orderData) => {
  let total = 0;
  const productsDetailed = [];

  for (const item of orderData.products) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    const subtotal = product.price * item.quantity;

    total += subtotal;

    productsDetailed.push({
      productId: product._id,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const order = new Order({
    customerName: orderData.customerName,
    phone: orderData.phone,
    products: productsDetailed,
    total: total,
  });

  return await order.save();
};

exports.getOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

exports.updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};
