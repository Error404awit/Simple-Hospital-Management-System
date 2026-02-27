import express from "express";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

const router = express();

router.get("/", getPatients);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
