import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/patient" element={<Patient />} />
    </Routes>
  );
};

export default App;
