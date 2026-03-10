const orderService = require("../services/orderService");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // emitir socket
    const io = req.app.get("io");

    io.emit("newOrder", order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
    );

    res.json(order);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await orderService.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
