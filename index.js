const compression = require("compression");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
const morgan = require("morgan");
const userRouter = require("./modules/auth/userRouter");
const doctorRouter = require("./modules/doctor/doctorRouter");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}
app.use(express.urlencoded());
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

module.exports = app;
