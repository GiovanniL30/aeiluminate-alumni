import React from "react";
import { NavLink, useParams } from "react-router-dom";
import default_img from "../../../assets/default-img.png";

/**
 *
 * Chatprofile component used in Inbox
 *
 * @author Giovanni Leo
 */
const ChatProfile = ({ receiverId, img, userName }) => {
  const { receiverId: URLID } = useParams();

  return (
    <NavLink to={receiverId}>
      <div className={`flex items-center gap-2 p-2 rounded-sm ${URLID == receiverId && "bg-light_blue font-bold"}`}>
        <img className="min-w-8 h-8 md:w-11 md:h-11 rounded-full object-cover" src={img ? img : default_img} alt="" />
        <p className="text-sm md:text-md">{userName}</p>
      </div>
    </NavLink>
  );
};

export default ChatProfile;
