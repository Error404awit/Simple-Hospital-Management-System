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
  const [showConfirm, setShowConfirm] = useState(null);

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
      <div className="Container h-full w-full flex justify-between">
        <div className="h-full w-3/6 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2.5 bg-white w-[450px] p-[30px] rounded-[20px] mt-[-100px]">
            <label className="text-[#151717] font-semibold">Name</label>
            <div
              className="h-[50px] flex items-center transition-[0.2s] duration-[ease-in-out] rounded-[10px] border-[1.5px] 
              border-solid border-[#ecedec]"
            >
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-full rounded-[10px] border-[none] focus:outline-none 
                focus-within:border-[1.5px] focus-within:border-solid focus-within:border-[#2d79f3]"
              />
            </div>

            <label className="text-[#151717] font-semibold">Age</label>
            <div
              className="h-[50px] flex items-center transition-[0.2s] duration-[ease-in-out] rounded-[10px] border-[1.5px] 
              border-solid border-[#ecedec]"
            >
              <input
                type="text"
                placeholder="Enter your Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full h-full rounded-[10px] border-[none] focus:outline-none 
                focus-within:border-[1.5px] focus-within:border-solid focus-within:border-[#2d79f3]"
              />
            </div>

            <label className="text-[#151717] font-semibold">Gender</label>
            <div
              className="h-[50px] flex items-center transition-[0.2s] duration-[ease-in-out] rounded-[10px] border-[1.5px] 
              border-solid border-[#ecedec]"
            >
              <input
                type="text"
                placeholder="Enter your Name"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-full rounded-[10px] border-[none] focus:outline-none 
                focus-within:border-[1.5px] focus-within:border-solid focus-within:border-[#2d79f3]"
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pat.map((item) => (
                  <PatientCard
                    key={item._id}
                    pat={item}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
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
              Are you sure you want to delete patient {showConfirm.name}?
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

export default Patient;
