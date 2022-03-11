const bcrypt = require("bcrypt");
const User = require("./userModel");
const jwt = require("jsonwebtoken");
const util = require("util");
const { read } = require("fs");
const asyncSign = util.promisify(jwt.sign);
const secretKey = "ksdwkjwncnjewfjwnewrnj";

exports.checkID = async (req, res, next, value) => {
  const user = await User.findOne({ _id: value });
  if (!user) {
    return res.status(404).send({
      status: "fail",
      message: "invalid ID",
    });
  }
  next();
};

exports.checkRregisterInfo = async (req, res, next) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    return res.status(404).send({
      status: "fail",
      message: "please complete user informations",
    });
  }
  next();
};

exports.checkLoginInfo = async (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(404).send({
      status: "fail",
      message: "missing email or password",
    });
  }
  next();
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};

exports.editUser = async (req, res, next) => {
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
};
exports.registerUser = async (req, res, next) => {
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
    res.send({ token });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
exports.loginUser = async (req, res, next) => {
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
};
exports.userProfile = async (req, res) => {
  const profile = await User.find(req.user).select("-password");
  res.send(profile);
};
exports.deleteUser = async (req, res, next) => {
  try {
    const users = await User.deleteOne({ _id: req.params.id });
    res.send(users);
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
