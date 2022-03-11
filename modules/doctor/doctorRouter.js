const express = require("express");
const doctorRouter = express.Router();
const auth = require("../middlewares");
const doctorController = require("./doctorController");

//param middleware that check the request params
doctorRouter.param("id", doctorController.checkID);
doctorRouter
  .route("/", auth)
  .get(doctorController.getAllDoctor)
  .post(doctorController.checkBody, doctorController.createDocter);
doctorRouter
  .route("/:id", auth)
  .get(doctorController.getDoctor)
  .patch(doctorController.editDoctor)
  .delete(doctorController.deleteDocter);

module.exports = doctorRouter;
