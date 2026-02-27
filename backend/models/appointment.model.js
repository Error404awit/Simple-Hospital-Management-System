import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
