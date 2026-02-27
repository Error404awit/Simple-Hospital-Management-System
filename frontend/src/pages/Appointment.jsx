import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AppointmentCard from "../components/AppointmentCard.jsx";

const Appointment = () => {
  const [name, setName] = useState("");
  const [docName, setDocName] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [app, setApp] = useState([]);
  const [pName, setpName] = useState([]);
  const [dName, setdName] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [needsRefetch, setNeedsRefetch] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointment")
      .then((response) => {
        setApp(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [needsRefetch]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patient")
      .then((response) => {
        setpName(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [needsRefetch]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/doctor")
      .then((response) => {
        setdName(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [needsRefetch]);

  return (
    <div className="bg-[#e1e7ed] h-screen overflow-hidden">
      <Navbar />
      <div className="h-full w-full flex justify-between">
        <div className="h-full w-3/6">
          <div className="h-auto mt-16 mx-auto w-[80%] card flex flex-col rounded-md">
            <div className="mt-6 mb-4 mx-8">
              <select className="items-select text-xl w-full px-4 py-2 border-2 border-[#cccccc] rounded-md outline-none">
                <option value="">Patient's Name</option>
                {pName.map((Pname) => (
                  <option value="" key={Pname._id}>
                    {Pname.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2 mx-8">
              <select className="items-select text-xl w-full px-4 py-2 border-2 border-[#cccccc] rounded-md outline-none">
                <option value="">Doctor's Name</option>
                {dName.map((Dname) => (
                  <option value="" key={Dname._id}>
                    {Dname.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2 mx-8">
              <label className="text-xl">
                Date
                <input
                  type="date"
                  className="w-full px-4 py-2 border-2 border-[#cccccc] rounded-md"
                />
              </label>
            </div>
            <button
              className="border-2 border-sky-500 hover:bg-sky-500 rounded-md p-2 mt-5 mx-auto w-[90%] mb-8"
              //onClick={handleAdd}
            >
              Save
            </button>
          </div>
        </div>

        <div className="relative h-full w-[45%] overflow-y-scroll">
          {/*app.map((item) => (
            <AppointmentCard />
          ))*/}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
