import React, { useState } from "react";
import { CiEdit, CiTrash, CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const PatientCard = ({ pat, onEdit, onDelete, onRequestDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(pat.name);
  const [newAge, setNewAge] = useState(pat.age);
  const [newGender, setNewGender] = useState(pat.gender);

  const handleUpdate = () => {
    onEdit(pat._id, newName, newAge, newGender);
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
          pat.name
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {isEditing ? (
          <input
            type="text"
            value={newAge}
            onChange={(event) => {
              setNewAge(event.target.value);
            }}
            className="border border-1 border-[#cccccc] rounded-md w-full px-2 py-1 text-sm"
          />
        ) : (
          pat.age
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {isEditing ? (
          <input
            type="text"
            value={newGender}
            onChange={(event) => {
              setNewGender(event.target.value);
            }}
            className="border border-1 border-[#cccccc] rounded-md w-full px-2 py-1 text-sm"
          />
        ) : (
          pat.gender
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
          <CiTrash
            className="text-red-600 cursor-pointer"
            onClick={onRequestDelete}
          />
        )}
      </td>
    </tr>
  );
};

export default PatientCard;
