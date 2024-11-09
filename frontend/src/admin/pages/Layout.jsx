import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="pl-[270px] p-6">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
