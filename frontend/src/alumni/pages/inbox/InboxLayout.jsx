import React from "react";
import { Outlet } from "react-router-dom";
import InboxSidebar from "../../components/inbox/InboxSidebar";

const InboxLayout = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 min-h-full w-full">
      <div className="max-h-[300px] md:w-[250px]">
        <InboxSidebar />
      </div>
      <div className="flex-1 pb-3">
        <Outlet />
      </div>
    </div>
  );
};

export default InboxLayout;
