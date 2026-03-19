const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

router.post("/", authMiddleware, orderController.createOrder);
router.get("/", authMiddleware, adminMiddleware, orderController.getOrders);
router.get("/stats", authMiddleware, adminMiddleware, orderController.getStats);
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderStatus,
);

module.exports = router;
