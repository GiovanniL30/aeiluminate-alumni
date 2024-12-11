import React from "react";
import { useGetUser, useUserFollowing, useUserFollower, useGetUserPosts } from "../../_api/@react-client-query/query";
import { NavLink } from "react-router-dom";
import default_img from "../../../assets/default-img.png";
import Button from "../../components/Button";
import email from "../../../assets/mail.png";

const SkeletonLoader = () => (
  <div className="flex items-center gap-6 rounded-xl p-4 shadow-lg bg-white animate-pulse">
    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex gap-4 text-sm font-semibold">
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-40 h-6 bg-gray-300 rounded"></div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-full h-10 bg-gray-300 rounded"></div>
        <div className="w-full h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const UserCard = ({ userID }) => {
  const { data, isLoading, isError, error } = useGetUser(userID);
  const followingQuery = useUserFollowing(userID);
  const followerQuery = useUserFollower(userID);
  const userPostsQuery = useGetUserPosts(userID);

  if (followerQuery.isLoading || followingQuery.isLoading || userPostsQuery.isLoading || isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <div className="flex items-center gap-6 rounded-xl p-4 shadow-lg bg-white">
        <img className="w-16 h-16 rounded-full object-cover bg-white" src={data.user.profile_picture || default_img} alt="Profile" />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <p className="font-bold text-xl">{data.user.username}</p>
            <span className="text-sm font-normal">({data.user.role})</span>
          </div>

          <div className="flex gap-4 text-sm font-semibold">
            <p>{userPostsQuery?.data?.length} posts</p>
            <p>{followerQuery?.data?.length} followers</p>
            <p>{followingQuery?.data?.length} following</p>
          </div>

          <h2 className="font-medium text-lg">
            {data.user.firstName} {data.user.lastName}
          </h2>

          <div className="flex items-center gap-2">
            <img className="w-5" src={email} alt="Email" />
            <span className="underline text-sm">{data.user.email}</span>
          </div>

          <div className="flex gap-2 mt-4">
            <NavLink to={`/inbox/${data.user.userID}`} className="w-full">
              <Button variant="outline" text="Message" otherStyle="w-full text-primary_blue border-primary_blue" />
            </NavLink>
            <NavLink to={`/user/${data.user.userID}`} className="w-full">
              <Button text="Visit Profile" otherStyle="w-full" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
