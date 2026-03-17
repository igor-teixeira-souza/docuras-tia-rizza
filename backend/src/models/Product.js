const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: String,

  price: {
    type: Number,
    required: true,
  },

  category: String,

  image: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Permite acessar `product.id` no frontend sem precisar usar _id
ProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ProductSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Product", ProductSchema);
