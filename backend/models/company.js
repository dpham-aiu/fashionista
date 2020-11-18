const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
  companyName: String,
  companyDescription: String,
});

module.exports = mongoose.model("Company", CompanySchema);
