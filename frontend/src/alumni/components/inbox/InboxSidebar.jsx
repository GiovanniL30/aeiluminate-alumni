import React from "react";
import ChatProfile from "./ChatProfile";
import { useParams } from "react-router-dom";
import { useConversationList } from "../../_api/@react-client-query/query";
import { useAuthContext } from "../../context/AuthContext";
import default_img from "../../../assets/default-img.png";

/**
 *
 * Sidebar on the inbox
 *
 * @author Giovanni Leo
 */
const InboxSidebar = () => {
  const { receiverId } = useParams();
  const { user } = useAuthContext();

  const conversationList = useConversationList();

  if (conversationList.isLoading) return <h1>Loading Lists..</h1>;

  return (
    <div className="h-full">
      <h1 className="font-semibold text-light_text text-xl md:text-2xl mb-4">Chats ({conversationList.data.conversations.length})</h1>
      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto overflow-x-hidden w-full">
        {conversationList.data.conversations.map((conversation, index) => {
          const isCurrentUserMemberOne = user.userID == conversation.memberOneID;
          const otherUserID = isCurrentUserMemberOne ? conversation.memberTwoID : conversation.memberOneID;
          const otherUserName = isCurrentUserMemberOne ? conversation.memberTwoUsername : conversation.memberOneUsername;
          const otherUserProfilePicture = isCurrentUserMemberOne ? conversation.memberTwoProfilePicture : conversation.memberOneProfilePicture;
          return (
            <ChatProfile
              key={index}
              userName={otherUserName}
              img={otherUserProfilePicture ? otherUserProfilePicture : default_img}
              receiverId={otherUserID}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InboxSidebar;
