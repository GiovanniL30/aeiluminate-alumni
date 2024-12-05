import React from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import UserProfilePic from "../UserProfilePic.jsx";

const FollowList = ({ data }) => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col gap-10">
      {data.map((follower, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-11">
            <UserProfilePic profile_link={follower.profile_picture} userID={follower.userID} otherImageStyle="h-11 w-11" />
          </div>
          <div>
            <h1 className="font-bold">{follower.username}</h1>
            <p className="text-sm text-light_text">{follower.total_followers} followers</p>
          </div>
          {user.userID == follower.userID && (
            <div className="my-auto">
              <h1 className="font-bold text-sm text-primary_blue">YOU</h1>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FollowList;
