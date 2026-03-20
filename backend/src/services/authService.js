const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {
  const { name, email, password, phone } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Usuário já existe com este email");
  }

  const user = new User({
    name,
    email,
    password,
    phone,
    role: "user", // sempre user
  });

  await user.save();
  return { message: "Usuário criado com sucesso" };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Credenciais inválidas");

  const isValid = await user.comparePassword(password); // método do modelo
  if (!isValid) throw new Error("Credenciais inválidas");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }, 
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
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  }).select("-password");
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return user;
};
