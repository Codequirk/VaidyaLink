const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  address: String,
  pincode: String,
  password: String,
  uniqueId: String,
  reports: [String], // URLs or file references
});

module.exports = mongoose.model("Patient", patientSchema);
