import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full left-0 right-0 z-50">
        <Navbar />
      </header>
      <section className="flex-1 p-0 md:px-5 pt-[120px] flex pb-36 md:pb-10">
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
