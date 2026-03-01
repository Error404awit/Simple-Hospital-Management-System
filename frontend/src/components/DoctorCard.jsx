import React, { useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";
import { CiEdit, CiTrash, CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const DoctorCard = ({ doc, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(doc.name);
  const [newSpec, setNewSpec] = useState(doc.specialization);

  const handleUpdate = () => {
    onEdit(doc._id, newName, newSpec);
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition duration-200">
      <td className="px-6 py-4 font-medium text-gray-700">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            className="border border-1 border-[#cccccc] rounded-md w-full px-2 py-1 text-sm"
          />
        ) : (
          <div className="flex items-center gap-2">
            <FaUserDoctor />
            <span>{doc.name}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {isEditing ? (
          <input
            type="text"
            value={newSpec}
            onChange={(event) => {
              setNewSpec(event.target.value);
            }}
            className="border border-1 border-[#cccccc] rounded-md w-full px-2 py-1 text-sm"
          />
        ) : (
          <div className="flex items-center gap-2">
            <GrUserExpert />
            <span>{doc.specialization}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-2xl">
        {isEditing ? (
          <CiCircleCheck
            onClick={() => {
              handleUpdate();
            }}
            className="text-green-600 cursor-pointer"
          />
        ) : (
          <CiEdit
            onClick={() => {
              setIsEditing(true);
            }}
            className="text-green-600 cursor-pointer"
          />
        )}
      </td>
      <td className="px-6 py-4 text-2xl">
        {isEditing ? (
          <CiCircleRemove
            className="text-red-600 cursor-pointer"
            onClick={() => setIsEditing(false)}
          />
        ) : (
          <CiTrash className="text-red-600 cursor-pointer" onClick={onDelete} />
        )}
      </td>
    </tr>
  );
};

export default DoctorCard;
