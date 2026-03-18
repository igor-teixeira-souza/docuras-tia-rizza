const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/auth");

router.post("/", authMiddleware, orderController.createOrder);
router.get("/stats", authMiddleware, orderController.getStats);
router.get("/", authMiddleware, orderController.getOrders);
router.patch("/:id/status", authMiddleware, orderController.updateOrderStatus);

module.exports = router;