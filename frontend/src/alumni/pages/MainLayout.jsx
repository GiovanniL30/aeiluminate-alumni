import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SocketProvider from "../context/SocketContext";

const MainLayout = () => {
  return (
    <SocketProvider>
      <main className="min-h-screen flex flex-col">
        <header className="padding-x fixed w-full top-0 left-0 right-0 z-50">
          <Navbar />
        </header>
        <section className="flex-1 padding-x pt-28 flex">
          <Outlet />
        </section>
      </main>
    </SocketProvider>
  );
};

export default MainLayout;
