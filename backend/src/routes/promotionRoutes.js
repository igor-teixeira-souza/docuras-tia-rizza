const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotionController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// Rotas públicas (client-side) – se quiser que as promoções apareçam no site
router.get("/", promotionController.getAll);
router.get("/:id", promotionController.getById);

// Rotas administrativas (protegidas)
router.post("/", authMiddleware, adminMiddleware, promotionController.create);
router.put("/:id", authMiddleware, adminMiddleware, promotionController.update);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  promotionController.delete,
);

module.exports = router;
