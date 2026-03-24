const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// Rota GET: pública – qualquer um pode visualizar as configurações do site
router.get("/", settingsController.getSettings);

// Rota PUT: protegida – apenas admin pode atualizar as configurações
router.put(
  "/",
  authMiddleware,
  adminMiddleware,
  settingsController.updateSettings,
);

module.exports = router;
