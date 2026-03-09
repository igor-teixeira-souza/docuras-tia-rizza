const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

console.log(orderController);
router.post("/orders", orderController.createOrder);

router.get("/orders/stats", orderController.getStats);

router.get("/", orderController.getOrders);

router.patch("/orders/:id/status", orderController.updateOrderStatus);

module.exports = router;
