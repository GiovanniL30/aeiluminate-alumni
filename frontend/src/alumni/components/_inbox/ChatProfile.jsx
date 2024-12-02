import React from "react";
import { NavLink, useParams } from "react-router-dom";

const ChatProfile = ({ receiverId, img, userName }) => {
  const { receiverId: URLID } = useParams();

  return (
    <NavLink to={receiverId}>
      <div className={`flex items-center gap-2 p-2 rounded-sm ${URLID == receiverId && "bg-light_blue font-bold"}`}>
        <img className="min-w-11 h-11 rounded-full object-cover" src={img} alt="" />
        <p>{userName}</p>
      </div>
    </NavLink>
  );
};

export default ChatProfile;
