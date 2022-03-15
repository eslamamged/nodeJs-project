const compression = require("compression");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
const morgan = require("morgan");
const userRouter = require("./Routes/userRouter");
const doctorRouter = require("./Routes/doctorRouter");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}
app.use(express.urlencoded());
app.use("/users", userRouter);
app.use("/doctors", doctorRouter);

// this is wildcard API to handle the wrong url
app.get("*", (req, res, next) => {
  const err = new Error("sorry,this is invalid url");
  err.status = "fail";
  err.statusCode = "404";
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors || [],
  });
});

module.exports = app;
