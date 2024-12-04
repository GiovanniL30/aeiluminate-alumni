import React from "react";
import { timeAgo } from "../../../utils";
import { useAuthContext } from "../../context/AuthContext";
import UserProfilePic from "../UserProfilePic";
import { ReadMore } from "../ReadMore";

const CommentBlock = ({ userProfilePic, userName, userID, commentID, commentCreatedAt, commentContent }) => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col items-start md:flex-row md:items-center   gap-3">
      <UserProfilePic userID={userID} profile_link={userProfilePic} />

      <div className="flex flex-col-reverse md:flex-col ">
        <div className="flex gap-2 text-sm">
          <p className="font-bold">{user.userID == userID ? "You" : userName}</p>
          <p className="text-light_text">{timeAgo(commentCreatedAt)}</p>
        </div>
        <div className="max-w-[120px] sm:max-w-[400px]">
          <ReadMore text={commentContent} charLimit={100} />
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;
