// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

//icons
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <div className="navbar bg-base-100 shadow-md p-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          devfinder
        </Link>
      </div>
      <div className="flex-none">
        <button onClick={toggleTheme} className="btn btn-ghost">
          {theme === "light" ? "DARK" : "LIGHT"}
          {theme === "light" ? (
            <IoMdMoon className="swap-on fill-current w-6 h-6" />
          ) : (
            <IoMdSunny className="swap-off fill-current w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
