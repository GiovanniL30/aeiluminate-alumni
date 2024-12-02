import React from "react";
import ChatProfile from "./ChatProfile";

const InboxSidebar = () => {
  return (
    <div className="w-[250px]">
      <h1 className="font-semibold text-light_text text-2xl mb-4">Chats</h1>
      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto w-full">
        <ChatProfile userName="gi" />
        <ChatProfile userName="gio" />
        <ChatProfile userName="gioasc" />
        <ChatProfile userName="gi" />
        <ChatProfile userName="gio" />
        <ChatProfile userName="gioasc" />
        <ChatProfile userName="gi" />
        <ChatProfile userName="gio" />
        <ChatProfile userName="gioasc" />
        <ChatProfile userName="gi" />
        <ChatProfile userName="gio" />
        <ChatProfile userName="gioasc" />
        <ChatProfile userName="gi" />
        <ChatProfile userName="gio" />
        <ChatProfile userName="gioasc" />
      </div>
    </div>
  );
};

export default InboxSidebar;
