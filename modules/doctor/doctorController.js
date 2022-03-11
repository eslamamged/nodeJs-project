const Doctor = require("./doctorModel");

exports.checkID = async (req, res, next, value) => {
  const doctor = await Doctor.findOne({ _id: value });
  if (!doctor) {
    return res.status(404).send({
      status: "fail",
      message: "invalid ID",
    });
  }
  next();
};

exports.checkBody = async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.department ||
    !req.body.email ||
    !req.body.address ||
    !req.body.rate ||
    !req.body.image
  ) {
    return res.status(404).send({
      status: "fail",
      message: "please complete the doctor information",
    });
  }
  next();
};

exports.getAllDoctor = async (req, res, next) => {
  const doctors = await Doctor.find();
  res.send(doctors);
};
exports.editDoctor = async (req, res, next) => {
  let { name, department, email, phone, address, rate, image } = req.body;
  const { id } = req.params;
  try {
    const oldDoctor = await Doctor.findOne({ id });
    const updated = await Doctor.findByIdAndUpdate(id, {
      name: name || oldDoctor.name,
      department: department || oldDoctor.department,
      email: email || oldDoctor.email,
      phone: phone || oldDoctor.phone,
      address: address || oldDoctor.address,
      rate: rate || oldDoctor.rate,
      image: image || oldDoctor.image,
    });
    res.send(updated);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id });
    res.send(doctor);
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.createDocter = async (req, res, next) => {
  const { name, department, email, phone, address, rate, image } = req.body;
  try {
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      throw new Error("doctor email found in the database");
    }
    doctor = new Doctor({
      name,
      department,
      email,
      phone,
      address,
      rate,
      image,
    });
    const createdUser = await doctor.save();
    res.send(createdUser);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
exports.deleteDocter = async (req, res, next) => {
  try {
    const doctors = await Doctor.deleteOne({ _id: req.params.id });
    res.send(doctors);
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
