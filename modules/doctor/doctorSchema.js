const mongoose = require("mongoose");
//Define a schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 44,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    length: 11,
  },
  doctorAddress: {
    city: { type: String },
    country: { type: String },
  },
  rate: {
    type: String,
    required: true,
  },
});
module.exports = doctorSchema;
