import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SocketProvider from "../context/SocketContext";

const MainLayout = () => {
  return (
    <SocketProvider>
      <main>
        <header className="padding-x fixed w-full top-0 z-50">
          <Navbar />
        </header>
        <section className="padding mt-11">
          <Outlet />
        </section>
      </main>
    </SocketProvider>
  );
};

export default MainLayout;
