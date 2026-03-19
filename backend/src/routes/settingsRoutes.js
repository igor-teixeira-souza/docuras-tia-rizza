const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// Apenas admin pode ver/editar configurações (opcional, mas recomendado)
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  settingsController.getSettings,
);
router.put(
  "/",
  authMiddleware,
  adminMiddleware,
  settingsController.updateSettings,
);

module.exports = router;
