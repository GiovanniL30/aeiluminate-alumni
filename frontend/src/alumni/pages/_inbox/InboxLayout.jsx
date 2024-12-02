import React from "react";
import { Outlet } from "react-router-dom";
import InboxSidebar from "../../components/_inbox/InboxSidebar";

const InboxLayout = () => {
  return (
    <div className="min-w-[1000px] max-container flex gap-3">
      <InboxSidebar />
      <Outlet />
    </div>
  );
};

export default InboxLayout;
