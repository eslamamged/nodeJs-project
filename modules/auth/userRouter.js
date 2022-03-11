const express = require("express");
const auth = require("../middlewares");
const userRouter = express.Router();
const userController = require("./userController");

userRouter.param("id", userController.checkID);
userRouter.get("/", userController.getAllUsers);
userRouter
  .route("/:id")
  .patch(userController.editUser)
  .delete(userController.deleteUser);
userRouter.post(
  "/register",
  userController.checkRregisterInfo,
  userController.registerUser
);
userRouter.post(
  "/login",
  userController.checkLoginInfo,
  userController.loginUser
);
userRouter.get("/profile", auth, userController.userProfile);
module.exports = userRouter;
