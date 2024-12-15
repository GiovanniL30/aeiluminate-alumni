import React from "react";
import { timeAgo } from "../../../utils";
import { useAuthContext } from "../../context/AuthContext";
import UserProfilePic from "../UserProfilePic";
import { ReadMore } from "../ReadMore";

/**
 * Comment Block
 *
 * @author Giovanni Leo
 */
const CommentBlock = ({ userProfilePic, userName, userID, commentID, commentCreatedAt, commentContent }) => {
  const { user } = useAuthContext();
  return (
    <div className="w-full flex flex-col items-start md:flex-row md:items-center   gap-3">
      <UserProfilePic userID={userID} profile_link={userProfilePic} />

      <div className="flex flex-col md:flex-col ">
        <div className="flex gap-2 text-sm">
          <p className="font-bold">{user.userID == userID ? "You" : userName}</p>
          <p className="text-light_text">{timeAgo(commentCreatedAt)}</p>
        </div>
        <div className="">
          <ReadMore text={commentContent} charLimit={50} />
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;
