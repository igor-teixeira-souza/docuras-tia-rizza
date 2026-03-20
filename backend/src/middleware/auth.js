const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // <-- deve ser assim
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") { // <-- adicione verificação
    return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };