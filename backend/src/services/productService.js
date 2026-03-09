const Product = require("../models/Product");

// criar produto
exports.createProduct = async (data) => {
  const product = new Product(data);

  return await product.save();
};

// listar produtos
exports.getProducts = async (query = {}) => {

  const filter = {}

  if (query.category) {
    filter.category = query.category
  }

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i"
    }
  }

  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 10

  const skip = (page - 1) * limit

  const products = await Product
    .find(filter)
    .skip(skip)
    .limit(limit)

  const totalProducts =
    await Product.countDocuments(filter)

  const totalPages =
    Math.ceil(totalProducts / limit)

  return {
    page,
    limit,
    totalProducts,
    totalPages,
    data: products
  }

};

// buscar por id
exports.getProductById = async (id) => {
  return await Product.findById(id);
};

// atualizar produto
exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// deletar produto
exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
