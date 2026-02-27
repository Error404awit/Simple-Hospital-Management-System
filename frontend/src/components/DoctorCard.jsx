import React, { useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoSaveOutline, IoCloseOutline } from "react-icons/io5";

const DoctorCard = ({ doc, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(doc.name);
  const [newSpec, setNewSpec] = useState(doc.specialization);
  const [del, setDel] = useState(false);

  const handleUpdate = () => {
    onEdit(doc._id, newName, newSpec);
    setIsEditing(false);
  };

  return (
    <div className="h-2/5 mt-16 mx-auto w-[80%] card rounded-md flex flex-col justify-evenly last:mb-28">
      <div className={del ? "hidden" : "p-5 mx-4 flex justify-start gap-x-3"}>
        <FaUserDoctor className="text-3xl" />
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            className=" border border-1 border-[#cccccc] rounded grow"
          />
        ) : (
          <h1 className="my-[0.20] text-xl">{doc.name}</h1>
        )}
      </div>

      <div className={del ? "hidden" : "p-5 mx-4 flex justify-start gap-x-3"}>
        <GrUserExpert className="text-3xl" />
        {isEditing ? (
          <input
            type="text"
            value={newSpec}
            onChange={(event) => {
              setNewSpec(event.target.value);
            }}
            className="border border-1 border-[#cccccc] rounded grow"
          />
        ) : (
          <h2 className="my-[0.20] text-xl">{doc.specialization}</h2>
        )}
      </div>

      {/*buttons*/}
      <div className={del ? "hidden" : "flex justify-evenly p-4 text-3xl"}>
        {isEditing ? (
          <IoSaveOutline
            onClick={() => {
              handleUpdate();
            }}
            className="text-green-800 cursor-pointer"
          />
        ) : (
          <CiEdit
            onClick={() => {
              setIsEditing(true);
            }}
            className="text-green-800 cursor-pointer"
          />
        )}
        {isEditing ? (
          <IoCloseOutline
            className="text-red-600 cursor-pointer"
            onClick={() => setIsEditing(false)}
          />
        ) : (
          <TiUserDeleteOutline
            className="text-red-600 cursor-pointer"
            onClick={() => setDel(true)}
          />
        )}
      </div>

      {
        //Delete
        del ? (
          <div className="w-full h-full flex flex-col items-center gap-4">
            <h1 className="text-lg my-10 px-4">
              Are you sure you want to delete this doctor?
            </h1>
            <button
              onClick={() => {
                setDel(false);
              }}
              className="rounded-md border-2 border-red-600 hover:bg-red-600 ease-in-out w-3/5 p-2"
            >
              No
            </button>
            <button
              onClick={() => {
                onDelete(doc._id);
              }}
              className="rounded-md border-2 border-green-800 hover:bg-green-800 w-3/5 p-2"
            >
              Yes
            </button>
          </div>
        ) : (
          ""
        )
      }
    </div>
  );
};

export default DoctorCard;
