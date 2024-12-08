import React from "react";
import ProfileHeader from "../../components/user/ProfileHeader.jsx";
import ProfileNavbar from "../../components/user/ProfileNavbar.jsx";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="px-3 w-full">
      <ProfileHeader />
      <ProfileNavbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
