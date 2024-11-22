import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useUserFollower, useUserFollowing } from "../_api/@react-client-query/query";

const ProfileHeader = () => {
  const { user } = useAuthContext();
  const followingQuery = useUserFollowing();
  const followerQuery = useUserFollower();

  const { bio, company, email, firstName, job_role, lastName, middleName, phoneNumber, profile_picture, role, userID, username } = user;

  return (
    <div>
      <div>
        <img src={profile_picture} alt="profile" />
      </div>
    </div>
  );
};

export default ProfileHeader;
