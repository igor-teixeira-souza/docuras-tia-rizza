// createAdmin.js (coloque na raiz do backend)
const mongoose = require("mongoose");
const User = require("./src/models/User");
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = "admin@docurastiarizza.com";
    const adminPassword = "Admin@123"; // use a senha que desejar

    // Verifica se já existe
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log("Admin já existe.");
      process.exit(0);
    }

    await User.create({
      name: "Administrador",
      email: adminEmail,
      password: adminPassword, // texto plano, o modelo fará o hash
      phone: "",
      role: "admin",
    });

    console.log("✅ Administrador criado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro:", error);
    process.exit(1);
  }
};

createAdmin();
