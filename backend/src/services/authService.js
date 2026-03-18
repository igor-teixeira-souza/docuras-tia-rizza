const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {
  const { name, email, password, phone } = userData;

  // Verificar se usuário já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Usuário já existe com este email");
  }

  const user = new User({
    name,
    email,
    password,
    phone,
  });

  return await user.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new Error("Credenciais inválidas");
  }

  // Gerar token JWT
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    token,
  };
};

exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return user;
};

exports.updateProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return user;
};