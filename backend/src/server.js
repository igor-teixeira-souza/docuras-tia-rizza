require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const bcrypt = require("bcrypt");

const connectDB = require("./database/mongo");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const User = require("./models/User");

const app = express();

// Logs de debug (Render)
console.log("JWT_SECRET carregado?", process.env.JWT_SECRET ? "Sim" : "Nao");
console.log("EMAIL_USER carregado?", process.env.EMAIL_USER ? "Sim" : "Nao");
console.log("MONGO_URI carregado?", process.env.MONGO_URI ? "Sim" : "Nao");
console.log("ADMIN_EMAIL carregado?", process.env.ADMIN_EMAIL ? "Sim" : "Nao");

// Middlewares
app.use(cors());
app.use(express.json());

// Arquivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/upload", uploadRoutes);

// Rota raiz
app.get("/", (req, res) => {
res.send("API Docuras da Tia Rizza funcionando");
});

// Criar servidor HTTP
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
cors: {
origin: "*",
},
});

app.set("io", io);

io.on("connection", (socket) => {
console.log("Cliente conectado:", socket.id);

socket.on("disconnect", () => {
console.log("Cliente desconectado:", socket.id);
});
});

// Criar admin automático
const createAdminIfNotExists = async () => {
try {
const adminEmail = process.env.ADMIN_EMAIL;

```
if (!adminEmail) {
  console.log("ADMIN_EMAIL nao definido, pulando criacao do admin");
  return;
}

const existingAdmin = await User.findOne({ email: adminEmail });

if (!existingAdmin) {
  const hashedPassword = await bcrypt.hash("sua-senha-segura-aqui", 10);

  await User.create({
    name: "Administrador",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Administrador criado com sucesso");
} else {
  console.log("Admin ja existe");
}
```

} catch (err) {
console.error("Erro ao criar/verificar admin:", err);
throw err;
}
};

// Inicializacao do servidor
const startServer = async () => {
try {
console.log("Iniciando servidor...");

```
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI nao definida");
}

await connectDB();
console.log("Banco conectado");

await createAdminIfNotExists();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
```

} catch (err) {
console.error("ERRO CRITICO AO INICIAR:", err);
process.exit(1);
}
};

startServer();
