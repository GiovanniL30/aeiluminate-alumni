import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
      <header className="padding-x fixed w-full top-0">
        <Navbar />
      </header>
      <section className="padding mt-11">
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
