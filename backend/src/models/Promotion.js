const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  link: String,
  active: { type: Boolean, default: true },
  validUntil: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Promotion", promotionSchema);
