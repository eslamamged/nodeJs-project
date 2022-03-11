const express = require("express");
const auth = require("./../modules/middlewares");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/", userController.getAllUsers);
userRouter
  .route("/:id")
  .patch(userController.editUser)
  .delete(userController.deleteUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/profile", auth, userController.userProfile);
module.exports = userRouter;
