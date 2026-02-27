import { Appointment } from "../models/appointment.model.js";

const getAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find({});
    res.status(200).json({
      count: appointment.length,
      data: appointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    if (!req.body.patientName || !req.body.doctorName || !req.body.date) {
      return res.status(400).send({
        message: "Send all required fields: Patient, Doctor, Date",
      });
    }

    const newAppointment = {
      patientName: req.body.patientName,
      doctorName: req.body.doctorName,
      date: req.body.date,
    };

    const appointment = await Appointment.create(newAppointment);
    return res.status(201).send(appointment);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    if (!req.body.patientName || !req.body.doctorName || !req.body.date) {
      return res.status(400).send({
        message: "Send all required fields: Patient, Doctor, Date",
      });
    }

    const { id } = req.params;
    const Result = await Appointment.findByIdAndUpdate(id, req.body);

    if (!Result) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    return res
      .status(200)
      .send({ message: "Appointment updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const Result = await Appointment.findByIdAndDelete(id);
    if (!Result) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.status(200).send({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
