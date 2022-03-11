const express = require("express");
const doctorRouter = express.Router();
const auth = require("../modules/middlewares");
const doctorController = require("../controller/doctorController");

doctorRouter
  .route("/", auth)
  .get(doctorController.getAllDoctor)
  .post(doctorController.createDocter);
doctorRouter
  .route("/:id", auth)
  .get(doctorController.getDoctor)
  .patch(doctorController.editDoctor)
  .delete(doctorController.deleteDocter);

module.exports = doctorRouter;
