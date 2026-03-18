const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    console.log("BODY RECEBIDO:", req.body); // 👈 ADICIONA AQUI

    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log("ERRO REGISTER:", error.message); // 👈 ADICIONA AQUI

    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
