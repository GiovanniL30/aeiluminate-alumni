import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
      <header className="padding-x  fixed w-full top-4">
        <Navbar />
      </header>
      <section className="padding mt-11">
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
