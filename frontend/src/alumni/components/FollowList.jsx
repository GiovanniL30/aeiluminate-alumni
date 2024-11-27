import React from "react";
import { useAuthContext } from "../context/AuthContext";

const FollowList = ({ data }) => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col gap-10">
      {data.map((follower) => (
        <div className="flex gap-4">
          <div className="w-11">
            <img className="w-full h-11 rounded-full object-cover" src={follower.profile_picture} alt="" />
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
