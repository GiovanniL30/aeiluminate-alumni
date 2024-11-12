import React, { useState } from "react";
import logo from "../../assets/logoCircle.png";

import { NavLink } from "react-router-dom";

import { navLinks } from "../constants";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false); // state to track if the nav is open or not

  // Function to toggle the navigation menu
  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="max-container flex justify-between items-center">
      <div className="w-12">
        <img src={logo} alt="logo" />
      </div>

      <ul
        className={`${
          openNav ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 bg-white shadow-md border-l-2 w-1/2 h-screen p-5 items-center gap-12 flex flex-col transition-transform duration-300 md:translate-x-0 md:relative md:border-0 md:shadow-none md:flex-row md:h-full md:p-0 md:w-fit md:items-center md:justify-center md:gap-16`}
      >
        <button className="md:hidden" onClick={toggleNav}>
          Close
        </button>

        {/* Loop through navLinks and apply size to images */}
        {navLinks.map((link, index) => (
          <NavLink onClick={() => setOpenNav(false)} className={`hover-opacity w-7 h-7 ${link?.otherStye}`} to={link.path} key={index}>
            <img className="object-contain w-full h-full" src={link.icon} alt={link.path} />
          </NavLink>
        ))}
      </ul>

      <div className="flex gap-4">
        <NavLink to="profile">Profile</NavLink>
        <button className="flex md:hidden" onClick={toggleNav}>
          Open
        </button>
      </div>
    </div>
  );
};

export default Navbar;
