const orderService = require("../services/orderService");
const Order = require("../models/Order");
const emailService = require("../services/emailService");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { customerName, customer, phone, address, products, items, total } =
      req.body;

    // Compatibilidade com payloads antigos
    const orderProducts =
      products ||
      (Array.isArray(items)
        ? items.map((item) => ({
            productId: item.productId || item.id,
            quantity: item.quantity,
            price: item.price,
          }))
        : []);

    const orderPayload = {
      customerName: customerName || customer,
      phone,
      address: address || "",
      products: orderProducts,
      total,
      userId: req.user.id, // Adicionar userId do usuário autenticado
    };

    const order = await Order.create(orderPayload);

    // --- ENVIO DE E-MAIL ---
    try {
      // Busca o pedido com os dados populados para obter os nomes dos produtos
      const populatedOrder = await Order.findById(order._id).populate(
        "products.productId",
        "name",
      );
      await emailService.sendOrderConfirmation(populatedOrder);
      console.log(`✅ E-mail enviado para o administrador`);
    } catch (emailError) {
      console.error(
        "❌ Erro ao enviar e-mail, mas pedido foi criado:",
        emailError,
      );
      // Não interrompe o fluxo – o pedido já foi criado
    }
    // -----------------------

    // emitir socket
    const io = req.app.get("io");
    if (io) {
      io.emit("newOrder", order);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
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
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
