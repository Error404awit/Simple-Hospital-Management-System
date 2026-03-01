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
  const [dataCollected, setDataCollected] = useState([]);
  const [showConfirm, setShowConfirm] = useState(null);
  const [values, setValues] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });

  const handleAdd = () => {
    const data = { ...values };
    axios
      .post("http://localhost:5000/appointment", data)
      .then(() => {
        enqueueSnackbar("The Patient appointment was successful", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/appointment");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/appointment/${id}`)
      .then(() => {
        enqueueSnackbar("The patient appointment Was cancelled successfully", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/appointment");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointment")
      .then((response) => {
        setDataCollected(response.data.data);
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

  useEffect(() => {
    if (needsRefetch) {
      setNeedsRefetch(false);
    }
  }, [needsRefetch]);

  return (
    <div className="bg-[#e1e7ed] h-screen overflow-hidden">
      <Navbar />
      <div className="h-full w-full flex justify-between">
        <div className="h-full w-3/6 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2.5 bg-white w-[450px] p-[30px] rounded-[20px] mt-[-100px]">
            <div className="relative h-[50px] rounded-[10px] border-[1.5px] border-[#2d79f3]">
              <select
                onChange={(e) =>
                  setValues({ ...values, patientName: e.target.value })
                }
                className="bg-transparent px-3 outline-none w-full h-full"
              >
                <option value="">Patient's Name</option>
                {pName.map((Pname) => (
                  <option value={Pname.name} key={Pname._id}>
                    {Pname.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative h-[50px] rounded-[10px] border-[1.5px] border-[#2d79f3]">
              <select
                onChange={(e) =>
                  setValues({ ...values, doctorName: e.target.value })
                }
                className="bg-transparent px-3 outline-none w-full h-full"
              >
                <option value="">Doctor's Name</option>
                {dName.map((Dname) => (
                  <option value={Dname.name} key={Dname._id}>
                    {Dname.name}
                  </option>
                ))}
              </select>
            </div>
            <label className="text-[#151717] font-semibold">Date</label>
            <div className="relative h-[50px] rounded-[10px] border-[1.5px] border-[#2d79f3] flex">
              <input
                type="date"
                onChange={(e) => setValues({ ...values, date: e.target.value })}
                className="bg-transparent px-3 outline-none w-full h-full"
              />
            </div>
            <button
              className="bg-sky-500 text-[white] text-[15px] font-medium h-[50px] w-full cursor-pointer mt-5 mb-2.5 mx-0
              rounded-[10px] border-[none] hover:bg-sky-300"
              onClick={handleAdd}
            >
              Save
            </button>
          </div>
        </div>

        <div className="relative h-full w-3/6 flex justify-center items-center">
          <div className="flex flex-col bg-white w-4/5 h-4/5 rounded-[20px] mt-[-100px] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Appointment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cancel Appointment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataCollected.map((item) => (
                  <AppointmentCard
                    key={item._id}
                    item={item}
                    onRequestDelete={() => setShowConfirm(item)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to cancel {showConfirm.patientName}'s
              appointment?
            </h2>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(showConfirm._id);
                  setShowConfirm(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
