const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    min: [4, "Too short, min 4 characters are required"],
    required: "Product name is required.",
  },
  productDescription: {
    type: String,
    min: [4, "Too short, min 4 characters are required"],
  },
  price: {
    type: Number,
    min: [2, "Too short, min 4 characters are required"],
    required: "Price is required.",
  },
  imageURL: {
    type: String,
    min: [4, "Too short, min 4 characters are required"],
  },
  quantity: { type: Number, default: 0 },
  company: { type: mongoose.Schema.ObjectId, ref: "Company" },
});

module.exports = mongoose.model("Product", ProductSchema);
