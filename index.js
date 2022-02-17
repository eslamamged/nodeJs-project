const compression = require("compression");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(compression());
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./modules/auth/userRouter");
const doctorRouter = require("./modules/doctor/doctorRouter");
app.use(morgan("combined"));
app.use(express.json());

app.use(express.urlencoded());

//connect to database
mongoose.connect(
  "mongodb://localhost:27017/testUsers",
  { useNewUrlParser: true },
  (err) => {
    if (err) process.exit(1);
    console.log("connected to database successfully");
  }
);
app.use("/users", userRouter);
app.use("/doctors", doctorRouter);

// this is wildcard API to handle the wrong url
app.get("*", (req, res) => {
  throw new Error("sorry,this is invalid url");
});

app.use((err, req, res, next) => {
  res.send({
    statusCode: err.statusCode,
    status: "fail",
    message: err.message,
    errors: err.errors || [],
  });
});

app.listen(3000);
