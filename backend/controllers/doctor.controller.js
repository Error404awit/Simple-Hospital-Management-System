import { Doctor } from "../models/doctor.model.js";

const getDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find({});
    res.status(200).send({
      count: doctor.length,
      data: doctor,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    if (!req.body.name || !req.body.specialization) {
      return res.status(400).send({
        message: "Send all required fields: Name and Specialization",
      });
    }

    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body);

    if (!doctor) {
      return res.status(404).send({ message: "No Records Found" });
    }
    return res.status(200).send({ message: "Records Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).send({ message: "No Records Found" });
    }
    return res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};

export { getDoctors, createDoctor, updateDoctor, deleteDoctor };
