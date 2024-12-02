import React from "react";
import ChatProfile from "./ChatProfile";
import { useParams } from "react-router-dom";
import { useConversationList } from "../../_api/@react-client-query/query";

const InboxSidebar = () => {
  const { receiverId } = useParams();

  const conversationList = useConversationList();

  if (conversationList.isLoading) return <h1>Loading Lists..</h1>;

  console.log(conversationList.data);

  return (
    <div className="h-full">
      <h1 className="font-semibold text-light_text text-2xl mb-4">Chats ({conversationList.data.conversations.length})</h1>
      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto overflow-x-hidden w-full">
        {conversationList.data.conversations.map((convesation, index) => (
          <ChatProfile
            key={index}
            userName={convesation.memberTwoUsername}
            img={convesation.memberTwoProfilePicture}
            receiverId={convesation.memberTwoID}
          />
        ))}
      </div>
    </div>
  );
};

export default InboxSidebar;
