const User = require("../models/User");
const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    await authService.register({ name, email, password, phone });
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data); // já contém user e token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // req.user.id foi definido no middleware
    const user = await authService.getProfile(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
