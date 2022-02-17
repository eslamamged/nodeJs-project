const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const auth = require("../middlewares");
const jwt = require("jsonwebtoken");
const util = require("util");
const userRouter = express.Router();
const asyncSign = util.promisify(jwt.sign);
const secretKey = "ksdwkjwncnjewfjwnewrnj";
userRouter.get("/", async (req, res, next) => {
  const users = await User.find();
  res.send(users);
});

userRouter.patch("/:id", async (req, res, next) => {
  const { username, password, email } = req.body;
  const { id } = req.params;
  try {
    const updated = await User.findByIdAndUpdate(id, {
      username,
      password,
      email,
    });
    res.send(updated);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});
//register api
userRouter.post("/register", async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("email found in the database");
    }
    user = new User({ name, password, email });
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    const createdUser = await user.save();
    const token = await asyncSign({ _id: user._id }, secretKey);
    // res.header("x-auth-token", token);
    res.send({ token });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});
// login api
userRouter.post("/login", async (req, res, next) => {
  const { password, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid email or password");
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      throw new Error("invalid email or password'");
    }
    const token = await asyncSign({ _id: user._id }, secretKey);
    res.send({ token });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
});
userRouter.get("/profile", auth, async (req, res) => {
  const profile = await User.find(req.user).select("-password");
  res.send(profile);
});
module.exports = userRouter;
