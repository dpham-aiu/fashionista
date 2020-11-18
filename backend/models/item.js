const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
  purchases: { type: Array, default: [] },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  fullName: { type: String },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  cardName: { type: String },
  cardNumber: { type: String },
  expmonth: { type: String },
  expyear: { type: String },
  cvv: { type: String },
});

module.exports = mongoose.model("Item", ItemSchema);
