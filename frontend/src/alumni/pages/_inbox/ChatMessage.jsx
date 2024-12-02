import React from "react";
import Message from "../../components/_inbox/Message";
import Button from "../../components/Button";

import { NavLink, useParams } from "react-router-dom";
import { useConversationMessages, useGetUser } from "../../_api/@react-client-query/query";
import { useQueryClient } from "@tanstack/react-query";

const ChatMessage = () => {
  const queryClient = useQueryClient();
  const { receiverId } = useParams();

  const convesationQuery = useConversationMessages(receiverId);
  const receiverUser = useGetUser(receiverId);

  if (convesationQuery.isLoading || receiverUser.isLoading) return <h1>Loading Conversation....</h1>;

  if (convesationQuery.isFetched && !convesationQuery.isError) {
    queryClient.invalidateQueries(["conversation", "list"]);
  }

  return (
    <>
      <div className="border-[2px] rounded-md w-full p-4 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3  bg-white z-40 pb-2">
          <img className="w-14 h-14 rounded-full object-cover" src={receiverUser.data.user.profile_picture} alt="" />
          <p className="text-xl mb-2">{receiverUser.data.user.username}</p>
        </div>

        <div>
          <div className="max-h-[600px] overflow-y-auto p-4">
            <div className="flex flex-col items-center mt-[100px] ">
              <img className="w-32 h-32 rounded-full object-cover" src={receiverUser.data.user.profile_picture} alt="" />
              <p className="text-2xl">{receiverUser.data.user.username}</p>
              <p className="text-light_text">
                {receiverUser.data.user.firstName} {receiverUser.data.user.lastName}
              </p>
              <NavLink to={`/user/${receiverId}`}>
                <Button text="View Profile" />
              </NavLink>
            </div>

            <div className="flex flex-col pt-[100px] gap-2 "></div>
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
