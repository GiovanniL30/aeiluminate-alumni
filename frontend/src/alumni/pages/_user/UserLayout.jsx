import React from "react";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileNavbar from "../../components/ProfileNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="w-full">
      <ProfileHeader />
      <ProfileNavbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
