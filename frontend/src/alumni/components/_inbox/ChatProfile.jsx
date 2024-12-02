import React from "react";

import logo from "../../../assets/logoCircle.png";

const ChatProfile = ({ id, img, userName }) => {
  return (
    <div className="flex items-center gap-2">
      <img className="w-11 h-11 rounded-full object-center" src={logo} alt="" />
      <p>{userName}</p>
    </div>
  );
};

export default ChatProfile;
