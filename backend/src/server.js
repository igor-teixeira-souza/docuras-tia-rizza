const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./database/mongo");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.use("/images", express.static("src/uploads"));

app.get("/", (req, res) => {
  res.send("API Doçuras da Tia Rizza funcionando 🍰");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
