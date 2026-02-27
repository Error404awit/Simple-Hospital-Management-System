import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import appointmentRoute from "./routes/appointment.routes.js";
import doctorRoute from "./routes/doctor.routes.js";
import patientRoute from "./routes/patient.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/appointment", appointmentRoute);
app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome Admin");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
