const mongoose = require("mongoose");
//Define a schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
    minlength: 3,
    maxlength: 44,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
  },
  email: {
    type: String,
    required: [true, "user must have a email"],
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
});
module.exports = userSchema;
