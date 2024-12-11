import React from "react";
import { NavLink } from "react-router-dom";
import { useGetUser, useGetUserPosts, useUserFollower, useUserFollowing } from "../_api/@react-client-query/query";
import { useAuthContext } from "../context/AuthContext";

import default_img from "../../assets/default-img.png";

const SkeletonLoader = () => <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>;

const UserProfilePic = ({ userID, profile_link, otherContainerStyle, otherImageStyle }) => {
  const followingQuery = useUserFollowing(userID);
  const followerQuery = useUserFollower(userID);
  const userPostsQuery = useGetUserPosts(userID);
  const userQuery = useGetUser(userID);
  const { user } = useAuthContext();

  if (followerQuery.isLoading || followingQuery.isLoading || userPostsQuery.isLoading || userQuery.isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className={`relative flex items-center group ${otherContainerStyle}`}>
      {user.userID == userID ? (
        <img className={`w-10 h-10 object-cover rounded-full ${otherImageStyle}`} src={profile_link ? profile_link : default_img} alt="profile" />
      ) : (
        <>
          <NavLink to={`/user/${userID}`}>
            <img
              className={`w-10 h-10 object-cover rounded-full hover-opacity ${otherImageStyle}`}
              src={profile_link ? profile_link : default_img}
              alt="profile"
            />
          </NavLink>
          <div className="pointer-events-none absolute bg-white top-14 left-5 z-20 flex flex-col p-4 w-80 rounded-lg shadow-2xl border-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-5 items-center">
              <div>
                <p className="text-sm text-light_text">
                  {userQuery.data.user.firstName} {userQuery.data.user.lastName}
                </p>
              </div>
            </div>
            <div className="flex self-center mt-4 gap-4 font-semibold">
              <p>{userPostsQuery?.data?.length} posts</p>
              <p>{followerQuery?.data?.length} followers</p>
              <p>{followingQuery?.data?.length} following</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfilePic;
