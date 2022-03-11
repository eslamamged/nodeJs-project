const Doctor = require("../modules/doctor/doctorModel");

exports.getAllDoctor = async (req, res, next) => {
  const doctors = await Doctor.find();
  res.send(doctors);
};
exports.editDoctor = async (req, res, next) => {
  let { name, department, email, phone, address, rate, image } = req.body;
  const { id } = req.params;
  try {
    const oldDoctor = await Doctor.findById(id);
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
    const doctor = await Doctor.findById(req.params.id);
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
