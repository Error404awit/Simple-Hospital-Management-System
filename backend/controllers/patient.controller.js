import { Patient } from "../models/patient.model.js";

const getPatients = async (req, res) => {
  try {
    const patient = await Patient.find({});
    res.status(200).send({
      count: patient.length,
      data: patient,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};
const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(200).json(patient);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body);
    if (!patient) {
      return res.status(404).send({ message: "No Records Found" });
    }
    return res.status(200).send({ message: "Records Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).send({ message: "No Records Found" });
    }
    return res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ massage: error.message });
  }
};

export { getPatients, createPatient, updatePatient, deletePatient };
