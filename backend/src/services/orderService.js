const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (orderData) => {
  if (!orderData || !orderData.products) {
    throw new Error("Lista de produtos é obrigatória");
  }

  let total = 0;
  const productsDetailed = [];

  for (const item of orderData.products) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error(`Produto não encontrado: ${item.productId}`);
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
    total,
  });

  return await order.save();
};

// src/services/orderService.js

exports.getStats = async () => {
  // Total de pedidos
  const totalOrders = await Order.countDocuments();

  // Total de faturamento
  const totalRevenueAgg = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$total" },
      },
    },
  ]);
  const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;

  // Data de hoje (00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Pedidos do dia
  const ordersToday = await Order.countDocuments({
    createdAt: { $gte: today },
  });

  // Faturamento do dia
  const todayRevenueAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: today } } },
    { $group: { _id: null, todayRevenue: { $sum: "$total" } } },
  ]);
  const todayRevenue = todayRevenueAgg[0]?.todayRevenue || 0;

  // Pedidos pendentes
  const pendingOrders = await Order.countDocuments({ status: "pending" });

  // Ranking de produtos vendidos
  const bestSellingAgg = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
  ]);

  // Adicionando nome do produto
  const bestSelling = await Promise.all(
    bestSellingAgg.map(async (item) => {
      const product = await Product.findById(item._id);
      return {
        productId: item._id,
        name: product?.name || "Produto removido",
        totalSold: item.totalSold,
      };
    }),
  );

  return {
    totalOrders,
    totalRevenue,
    ordersToday,
    todayRevenue,
    pendingOrders,
    bestSelling,
  };
};

exports.getOrders = async () => {
  const orders = await Order.find().populate(
    "products.productId",
    "name price category image",
  );

  return orders;
};

exports.updateOrderStatus = async (id, status) => {
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

  return order;
};
