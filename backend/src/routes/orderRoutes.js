const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/auth"); // importe

// Protege a criação de pedido com autenticação
router.post("/", authMiddleware, orderController.createOrder);

// As demais rotas podem ou não exigir autenticação
router.get("/", authMiddleware, orderController.getOrders);
router.get("/stats", authMiddleware, orderController.getStats);
router.patch("/:id/status", authMiddleware, orderController.updateOrderStatus);

module.exports = router;
