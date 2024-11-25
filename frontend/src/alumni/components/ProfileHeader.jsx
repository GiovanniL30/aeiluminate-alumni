import React from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  useIsFollowing,
  useUserFollower,
  useUserFollowing,
  useFollowUser,
  useUnFollowUser,
  useGetUser,
  useGetUserPosts,
} from "../_api/@react-client-query/query";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

const SkeletonLoader = () => (
  <div className="mt-11 flex flex-col items-center max-w-[800px] mx-auto gap-14 md:flex-row animate-pulse">
    <div className="w-56 h-56 rounded-full bg-slate-50"></div>
    <div className="flex flex-col gap-2 md:gap-5 w-full">
      <div className="flex items-center gap-10 md:gap-16">
        <div className="w-32 h-8 bg-slate-50"></div>
        <div className="w-32 h-10 bg-slate-50"></div>
      </div>
      <div className="flex justify-between">
        <div className="w-20 h-6 bg-slate-50"></div>
        <div className="w-20 h-6 bg-slate-50"></div>
        <div className="w-20 h-6 bg-slate-50"></div>
      </div>
      <div className="flex gap-3 md:flex-col md:gap-0">
        <div className="w-40 h-6 bbg-slate-50"></div>
        <div className="w-40 h-6 bg-slate-50"></div>
      </div>
    </div>
  </div>
);

const ProfileHeader = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const followUserQuery = useFollowUser();
  const unFollowUserQuery = useUnFollowUser();
  const userQuery = useGetUser(id);
  const followingQuery = useUserFollowing(id);
  const followerQuery = useUserFollower(id);
  const isFollowStatus = useIsFollowing(id);
  const userPostsQuery = useGetUserPosts(id);

  const followHandler = () => {
    console.log(id);
    if (isFollowStatus.data.isFollowing) {
      unFollowUserQuery.mutate(id);
    } else {
      followUserQuery.mutate(id);
    }
  };

  if (isFollowStatus.isLoading || followingQuery.isLoading || followerQuery.isLoading || userPostsQuery.isLoading) {
    return <SkeletonLoader />;
  }

  const { bio, company, email, firstName, job_role, lastName, middleName, phoneNumber, profile_picture, role, userID, username } =
    userQuery.data.user;

  return (
    <div className="mt-11 flex flex-col items-center max-w-[800px] mx-auto gap-14  md:flex-row">
      <div>
        <img className="w-56 h-56 rounded-full object-cover" src={profile_picture} alt="profile" />
      </div>
      <div className="flex flex-col gap-2 md:gap-5">
        <div className="flex items-center gap-10 md:gap-16">
          <p className="flex font-bold text-4xl">{username}</p>
          {id != user.userID ? (
            <Button
              onClick={followHandler}
              text={isFollowStatus.data.isFollowing ? "Unfollow" : "Follow"}
              disabled={followUserQuery.isPending || unFollowUserQuery.isPending || followerQuery.isFetching}
              otherStyle={`ml-10 ${isFollowStatus.data.isFollowing && "bg-red-500 disabled"}`}
            />
          ) : (
            <Button text="Edit Profile" />
          )}
        </div>
        <div className="flex justify-between">
          <p>
            <span className="font-bold">{userPostsQuery.data.length}</span> posts
          </p>
          <p>
            <span className="font-bold"> {followerQuery.data.length}</span> followers
          </p>
          <p>
            <span className="font-bold">{followingQuery.data.length}</span> following
          </p>
        </div>
        <div className="flex gap-3 md:flex-col md:gap-0">
          <p className="font-bold">
            {firstName} {lastName}
          </p>
          <p className="underline text-light_text">@{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;