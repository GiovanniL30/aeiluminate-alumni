import React from "react";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileNavbar from "../../components/ProfileNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <ProfileHeader />
      <ProfileNavbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
