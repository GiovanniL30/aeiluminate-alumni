import React from "react";
import { Outlet } from "react-router-dom";
import InboxSidebar from "../../components/_inbox/InboxSidebar";

const InboxLayout = () => {
  return (
    <div className="flex gap-3 min-h-full w-full">
      <div className="w-[20%] max-w-[250px]">
        <InboxSidebar />
      </div>

      <div className="flex-1 pb-3">
        <Outlet />
      </div>
    </div>
  );
};

export default InboxLayout;
