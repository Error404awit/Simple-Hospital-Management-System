import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import PatientCard from "../components/PatientCard.jsx";

const Patient = () => {
  const [pat, setPat] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [needsRefetch, setNeedsRefetch] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patient")
      .then((response) => {
        setPat(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [needsRefetch]);

  const handleAdd = (event) => {
    const data = {
      name,
      age,
      gender,
    };
    axios
      .post("http://localhost:5000/patient", data)
      .then(() => {
        enqueueSnackbar("The Patient Was added to the database successfully", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/patient");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleEdit = (id, newName, newAge, newGender) => {
    const data = {
      name: newName,
      age: newAge,
      gender: newGender,
    };
    axios
      .put(`http://localhost:5000/patient/${id}`, data)
      .then(() => {
        enqueueSnackbar("The Patient data Was updated successfully", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/patient");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/patient/${id}`)
      .then(() => {
        enqueueSnackbar("The patient data Was deleted successfully", {
          variant: "success",
        });
        setNeedsRefetch(true);
        navigate("/patient");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

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
          <div className="h-auto mt-16 mx-auto w-[80%] card flex flex-col rounded-md">
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
                Age
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#cccccc] rounded-md"
                />
              </label>
            </div>
            <div className="my-2 mx-8">
              <label className="text-xl">
                Gender
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#cccccc] rounded-md"
                />
              </label>
            </div>
            <button
              className="border-2 border-sky-500 hover:bg-sky-500 rounded-md p-2 mt-5 mx-auto w-[90%] mb-8"
              onClick={handleAdd}
            >
              Save
            </button>
          </div>
        </div>

        <div className="relative h-full w-[45%] overflow-y-scroll">
          {pat.map((item) => (
            <PatientCard
              key={item._id}
              pat={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patient;
