const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./database/mongo");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("src/uploads"));

// Rotas
app.use("/api/products", productRoutes); // Prefixo específico
app.use("/api/orders", orderRoutes); // Prefixo específico

// Rota raiz
app.get("/", (req, res) => {
  res.send("API Doçuras da Tia Rizza funcionando 🍰");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
