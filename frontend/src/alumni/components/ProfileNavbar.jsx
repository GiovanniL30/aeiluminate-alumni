import React from "react";
import { NavLink } from "react-router-dom";

const ProfileNavbar = () => {
  return (
    <div>
      <NavLink to="." end>
        Posts
      </NavLink>
      <NavLink to="events">Aeilines</NavLink>
    </div>
  );
};

export default ProfileNavbar;
