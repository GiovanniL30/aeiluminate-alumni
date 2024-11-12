import React from "react";
import UserHeader from "../../components/UserHeader";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <UserHeader /> <Outlet />
    </div>
  );
};

export default UserLayout;
