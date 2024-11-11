import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="ml-[245px] py-6 px-10">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
