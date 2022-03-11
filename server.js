const app = require("./index.js");
const mongoose = require("mongoose");
const port = 3000;
mongoose.connect(
  "mongodb://localhost:27017/testUsers",
  { useNewUrlParser: true },
  (err) => {
    if (err) process.exit(1);
    console.log("connected to database successfully");
  }
);
app.listen(port);
