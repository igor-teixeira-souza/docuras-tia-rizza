const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// Rotas públicas (GET) podem não precisar de auth
router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// Rotas protegidas (CRUD) devem usar authMiddleware + adminMiddleware
router.post("/", authMiddleware, adminMiddleware, productController.create);
router.put("/:id", authMiddleware, adminMiddleware, productController.update);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.delete,
);

module.exports = router;
