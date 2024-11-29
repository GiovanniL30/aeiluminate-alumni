import React from "react";
import { timeAgo } from "../../../utils";
import { useAuthContext } from "../../context/AuthContext";
import UserProfilePic from "../UserProfilePic";

const CommentBlock = ({ userProfilePic, userName, userID, commentID, commentCreatedAt, commentContent }) => {
  const { user } = useAuthContext();
  return (
    <div className="flex items-center gap-3">
      <UserProfilePic userID={userID} profile_link={userProfilePic} />

      <div className="flex flex-col">
        <div className="flex text-sm gap-8">
          <p className="font-bold">{user.userID == userID ? "You" : userName}</p>
          <p className="text-light_text">{timeAgo(commentCreatedAt)}</p>
        </div>
        <p>{commentContent}</p>
      </div>
    </div>
  );
};

export default CommentBlock;
