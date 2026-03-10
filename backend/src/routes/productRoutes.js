const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.single("image"),
  validateProduct,
  productController.createProduct,
);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.put("/:id", validateProduct, productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
