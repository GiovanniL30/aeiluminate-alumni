import React, { useState } from "react";
import logo from "../../assets/logoCircle.png";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";

import { useAuthContext } from "../context/AuthContext";
import Button from "./Button";
import { useLogoutUser } from "../_api/@react-client-query/query";

import default_img from "../../assets/default-img.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setToken, setUser } = useAuthContext();
  const logoutQuery = useLogoutUser();

  const handleLogout = () => {
    logoutQuery.mutate(null, {
      onSuccess: () => {
        setUser(null);
        setToken(null);
        navigate("/login");
      },
    });
  };

  return (
    <div className="p-2 md:px-5 flex justify-between bg-white py-4 w-full max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center w-full">
        <div className="w-12">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        <ul className="fixed bottom-0 left-0 right-0 h-fit py-5 w-full bg-white border-t-[1px] shadow-xl items-center gap-12 flex justify-evenly  transition-transform duration-300  md:relative md:border-0 md:shadow-none md:flex-row md:h-full md:p-0 md:w-fit md:items-center md:justify-center md:gap-16">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setOpenNav(false)}
              className={`w-7 h-7 flex flex-col items-center relative ${link?.otherStye}`}
            >
              {({ isActive }) => (
                <>
                  <img
                    className={`object-contain w-full h-full transition-all duration-300 ${isActive ? "translate-y-[-4px]" : ""}`}
                    src={link.icon}
                    alt={link.path}
                  />
                  {isActive && <div className="absolute w-2 h-2 -bottom-2 bg-secondary_blue rounded-full"></div>}
                </>
              )}
            </NavLink>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          <Button text="Sign out" otherStyle="bg-red-500" onClick={handleLogout} />
          <NavLink to={`/user/${user.userID}`} className="flex items-center gap-2 hover-opacity">
            <img className="w-12 h-12 rounded-full object-cover" src={user.profile_picture ? user.profile_picture : default_img} alt="profile" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
