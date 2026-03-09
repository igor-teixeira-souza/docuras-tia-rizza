const productService = require("../services/productService");

// criar produto
exports.createProduct = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    }

    const product = await productService.createProduct(data);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// listar produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// buscar por id
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// atualizar
exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// deletar
exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);

    res.json({ message: "Produto deletado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
