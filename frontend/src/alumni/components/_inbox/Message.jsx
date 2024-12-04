import React from "react";

import default_img from "../../../assets/default-img.png";

const Message = ({ fromMe, content, date, image }) => {
  return (
    <div className={`flex items-center gap-4 ${fromMe ? "flex-row-reverse" : "flex-row"}`}>
      <img className="w-12 h-12 rounded-full" src={image ? image : default_img} alt="Profile" />
      <div className="relative max-w-[50%]">
        <p
          className={`p-3 rounded-lg text-sm ${
            fromMe ? "bg-primary_blue text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"
          } break-words whitespace-pre-wrap`}
        >
          {content}
        </p>

        <p className={`text-xs mt-1 ${fromMe ? "text-right text-gray-300" : "text-left text-gray-500"}`}>{date}</p>
      </div>
    </div>
  );
};

export default Message;
