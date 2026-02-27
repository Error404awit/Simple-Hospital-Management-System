import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Caduceus from "../assets/caduceus.png";

const Navbar = () => {
  return (
    <header className="pr-4 bg-sky-500 flex justify-between h-[92px] w-screen">
      <div className="h-full flex items-center">
        <img src={Caduceus} alt="Logo" className="p-2 h-full"></img>
        <Link to="/">
          <h1 className="text-3xl font-bold">San Miguel Medical Center</h1>
        </Link>
      </div>
      <nav className="w-1/4">
        <ul className="flex justify-center items-center h-full w-full gap-4">
          <CustomLink to="/appointment">Appointment</CustomLink>
          <CustomLink to="/doctor">Doctor</CustomLink>
          <CustomLink to="/patient">Patient</CustomLink>
        </ul>
      </nav>
    </header>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={`p-4 ${isActive ? "active" : ""}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
