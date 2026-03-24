const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

router.post("/", authMiddleware, adminMiddleware, uploadController.uploadImage);

module.exports = router;
