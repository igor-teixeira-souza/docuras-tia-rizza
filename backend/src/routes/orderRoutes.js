const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/stats", orderController.getStats);
router.get("/", orderController.getOrders);
router.patch("/:id/status", orderController.updateOrderStatus);

module.exports = router;