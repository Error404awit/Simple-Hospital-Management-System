import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.jsx";

const Doctor = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [doc, setDoc] = useState([]);
  const [needsRefetch, setNeedsRefetch] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctor")
      .then((response) => {
        setDoc(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [needsRefetch]);

  const handleDoc = (event) => {
    event.preventDefault();
    const data = {
      name,
      specialization,
    };
    axios
      .post("http://localhost:5000/doctor", data)
      .then(() => {
        enqueueSnackbar("The Doctor Was added to the database successfully", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/doctor");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleEdit = (id, newName, newSpec) => {
    const data = {
      name: newName,
      specialization: newSpec,
    };
    axios
      .put(`http://localhost:5000/doctor/${id}`, data)
      .then(() => {
        enqueueSnackbar("The Doctor Was updated successfully", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/doctor");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/doctor/${id}`)
      .then(() => {
        enqueueSnackbar("The Doctor Was deleted successfully", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/doctor");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  //used to refresh
  useEffect(() => {
    if (needsRefetch) {
      setNeedsRefetch(false);
    }
  }, [needsRefetch]);

  return (
    <div className="bg-[#e1e7ed] h-screen overflow-hidden">
      <Navbar />
      <div className="h-full w-full flex justify-between">
        <div className="h-full w-3/6">
          <div className="h-2/5 mt-16 mx-auto w-[80%] card flex flex-col rounded-md">
            <div className="mt-6 mb-4 mx-8">
              <label className="text-xl">
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#cccccc] rounded-md"
                />
              </label>
            </div>
            <div className="my-2 mx-8">
              <label className="text-xl">
                Specialization
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#cccccc] rounded-md"
                />
              </label>
            </div>
            <button
              className="border-2 border-sky-500 hover:bg-sky-500 rounded-md p-2 mt-5 mx-auto w-[90%]"
              onClick={handleDoc}
            >
              Save
            </button>
          </div>
        </div>

        <div className="relative h-full w-[45%] overflow-y-scroll">
          {doc.map((item) => (
            <DoctorCard
              key={item._id}
              doc={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
