// src/server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./database/mongo");

// Importar rotas
const productRoutes = require("./routes/productRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

// Torna o io acessível nos controllers
app.set("io", io);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Prefixo /api para todas as rotas
app.use("/api/products", productRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Rota raiz apenas de teste
app.get("/", (req, res) => {
  res.send("API Docuras Tia Rizza funcionando!");
});

// Conectar MongoDB e iniciar servidor
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("MongoDB conectado com sucesso");
    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  });

// Socket.IO
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});
