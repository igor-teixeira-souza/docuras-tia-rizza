const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const upload = require("../middleware/upload");
const { adminMiddleware } = require("../middleware/auth");

router.post(
  "/",
  adminMiddleware,
  upload.single("image"),
  validateProduct,
  productController.createProduct,
);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.put("/:id", adminMiddleware, validateProduct, productController.updateProduct);

router.delete("/:id", adminMiddleware, productController.deleteProduct);

module.exports = router;
