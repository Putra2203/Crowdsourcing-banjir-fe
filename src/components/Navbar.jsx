import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full p-4 bg-[#94DAFF] flex justify-between items-center">
      <h1 className="text-xl font-bold lg:text-2xl">Crowdsourcing</h1>
        <ul className="flex gap-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-bold bg-[#1572A1] block p-2 rounded text-white"
                  : "block p-2"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              className="px-4 py-2 text-white bg-blue-800 rounded "
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
    </div>
  );
}

export default Navbar;
