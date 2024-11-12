import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
      <header className="padding-x py-5">
        <Navbar />
      </header>
      <section className="padding">
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
