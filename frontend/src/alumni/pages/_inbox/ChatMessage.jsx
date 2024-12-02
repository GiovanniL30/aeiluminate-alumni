import React from "react";
import Message from "../../components/_inbox/Message";
import Button from "../../components/Button";

import logo from "../../../assets/logoCircle.png";

const ChatMessage = () => {
  return (
    <>
      <div className="border-[2px] rounded-md w-full p-4 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3  bg-white z-40 pb-2">
          <img className="w-14 h-14 rounded-full object-cover" src={logo} alt="" />
          <p className="text-xl mb-2">user</p>
        </div>

        <div>
          <div className="max-h-[600px] overflow-y-auto p-4">
            <div className="flex flex-col items-center mt-[100px] ">
              <img className="w-32 h-32 rounded-full object-cover" src={logo} alt="" />
              <p className="text-2xl">username</p>
              <p className="text-light_text">Full Name</p>
              <Button text="View Profile" />
            </div>

            <div className="flex flex-col pt-[100px] gap-2 ">
              <Message fromMe={true} content="First sksksksksksskskskt" date="today" />
              <Message fromMe={false} content="Second sksksksksksskskskt" date="today" />
              <Message fromMe={true} content="First sksksksksksskskskt" date="today" />
              <Message fromMe={false} content="Second sksksksksksskskskt" date="today" />
              <Message fromMe={true} content="First sksksksksksskskskt" date="today" />
              <Message fromMe={false} content="Second sksksksksksskskskt" date="today" />
              <Message fromMe={true} content="First sksksksksksskskskt" date="today" />
              <Message fromMe={false} content="Second sksksksksksskskskt" date="today" />
            </div>
          </div>
        </div>

        <div className="w-full flex gap-2 pt-5">
          <textarea
            placeholder="Message"
            className="resize-none w-full border-[1px] border-slate-50 text-light_text rounded-sm focus:outline-primary_blue p-2 h-12"
          />
          <Button text="Send" otherStyle="px-11" />
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
