const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./database/mongo");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const usersRoutes = require("./routes/UsersRoutes"); // ou "./routes/usersRoutes"
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const settingsRoutes = require('./routes/settingsRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const bcrypt = require("bcrypt");
const app = express();

// Conectar banco
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("src/uploads"));

// Rotas
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/promotions', promotionRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("API Doçuras da Tia Rizza funcionando 🍰");
});

// Criar servidor HTTP
const server = http.createServer(app);

// Criar Socket
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const createAdminIfNotExists = async () => {
  const adminEmail = "admin@docurastiarizza.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("sua-senha-segura-aqui", 10);
    await User.create({
      name: "Administrador",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Administrador criado com sucesso!");
  }
};

createAdminIfNotExists();

// Conexão socket
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// salvar io global
app.set("io", io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
