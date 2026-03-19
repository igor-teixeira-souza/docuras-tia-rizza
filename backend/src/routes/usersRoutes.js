const express = require("express");
const router = express.Router();

// Se você tiver middleware de autenticação, use aqui
// const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", /*authMiddleware,*/ async (req, res) => {
  // TODO: buscar usuários no Mongo
  return res.status(200).json([]);
});

router.patch("/:id", /*authMiddleware,*/ async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // TODO: atualizar no Mongo
  return res.status(200).json({ id, ...updates });
});

// Criar Admin (pode ser na mesma rota de criar user, com role=admin, ou uma rota específica)
router.post("/admin", /*authMiddleware,*/ async (req, res) => {
  const data = req.body;

  // TODO: criar no Mongo com role: 'admin'
  return res.status(201).json({ ...data, role: "admin" });
});

module.exports = router;