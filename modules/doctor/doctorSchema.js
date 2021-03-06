const mongoose = require("mongoose");
//Define a schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Doctor must have a name"],
    minlength: 3,
    maxlength: 44,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Doctor must have a email"],
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
  address: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});
module.exports = doctorSchema;
