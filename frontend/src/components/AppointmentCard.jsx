import React, { useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";
import { CiTrash } from "react-icons/ci";

const AppointmentCard = ({ item, onRequestDelete }) => {
  const newDate = new Date(item.date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <tr className="hover:bg-gray-50 transition duration-200">
      <td className="px-6 py-4 text-sm text-gray-700">{item.patientName}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{item.doctorName}</td>
      <td className="px-6 py-4 text-sm text-center text-gray-700">{newDate}</td>
      <td className="px-6 py-4 text-red-600 align-middle">
        <div className="flex items-center justify-center">
          <CiTrash
            className="cursor-pointer text-2xl"
            onClick={onRequestDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default AppointmentCard;
