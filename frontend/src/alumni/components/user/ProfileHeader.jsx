import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import {
  useIsFollowing,
  useUserFollower,
  useUserFollowing,
  useFollowUser,
  useUnFollowUser,
  useGetUser,
  useGetUserPosts,
  useGetAlumniDetails,
} from "../../_api/@react-client-query/query.js";
import Button from "../Button.jsx";
import { NavLink, useParams } from "react-router-dom";

import default_img from "../../../assets/default-img.png";
import companyIcon from "../../../assets/enterprise.png";
import phoneIcon from "../../../assets/phone-call.png";
import emailIcon from "../../../assets/mail.png";
import privacyIcon from "../../../assets/privacy.png";
import ProfilePopUp from "./ProfilePopUp.jsx";

const SkeletonLoader = () => (
  <div className="mt-11 flex flex-col items-center max-w-[800px] mx-auto gap-5 md:flex-row animate-pulse">
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
  const [openProfile, setOpenProfile] = useState(false);

  const followUserQuery = useFollowUser();
  const unFollowUserQuery = useUnFollowUser();
  const userQuery = useGetUser(id);
  const followingQuery = useUserFollowing(id);
  const followerQuery = useUserFollower(id);
  const isFollowStatus = useIsFollowing(id);
  const userPostsQuery = useGetUserPosts(id);
  const alumniDetails = useGetAlumniDetails(id);

  const followHandler = () => {
    if (isFollowStatus.data.isFollowing) {
      unFollowUserQuery.mutate(id);
    } else {
      followUserQuery.mutate(id);
    }
  };

  if (
    alumniDetails.isLoading ||
    isFollowStatus.isLoading ||
    followingQuery.isLoading ||
    followerQuery.isLoading ||
    userPostsQuery.isLoading ||
    userQuery.isLoading
  ) {
    return <SkeletonLoader />;
  }

  const { bio, company, email, firstName, job_role, lastName, middleName, phoneNumber, profile_picture, role, userID, username, isPrivate } =
    userQuery.data.user;

  console.log(alumniDetails.data);

  return (
    <div className="w-full mt-11 flex flex-col  items-center max-w-[800px] mx-auto gap-5 md:gap-14  md:flex-row">
      {openProfile && <ProfilePopUp id={id} canEdit={id == user.userID} profile_picture={profile_picture} setOpenProfile={setOpenProfile} />}

      <button className="hover-opacity" onClick={() => setOpenProfile(true)}>
        <div className="relative">
          <img className="w-56 h-56 rounded-full object-cover" src={profile_picture ? profile_picture : default_img} alt="profile" />
          <img className={`${isPrivate ? "flex" : "hidden"} absolute bottom-0 w-10 h-10 right-[10px]`} src={privacyIcon} alt="private" />
        </div>
      </button>
      <div className="flex flex-col  gap-2 md:gap-5">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-16">
          <p className="flex items-center gap-3 font-bold text-4xl">
            {username} <span className="font-normal text-sm">({role})</span>
          </p>
          {id != user.userID ? (
            <div className="flex gap-2">
              <Button
                onClick={followHandler}
                text={isFollowStatus.data.isFollowing ? "Unfollow" : "Follow"}
                disabled={followUserQuery.isPending || unFollowUserQuery.isPending || followerQuery.isFetching}
                otherStyle={`md:ml-10 ${isFollowStatus.data.isFollowing && "bg-red-500 disabled"}`}
              />
              <NavLink to={`/inbox/${id}`}>
                <Button text="Message" />
              </NavLink>
            </div>
          ) : (
            <NavLink to="edit">
              {({ isActive }) => {
                return <Button text={isActive ? "Editing Profile" : "Edit Profile"} disabled={isActive} />;
              }}
            </NavLink>
          )}
        </div>
        <div className="flex flex-col   sm:gap-10 sm:flex-row items-center justify-between">
          <p>
            <span className="font-bold">{userPostsQuery.data.length}</span> posts
          </p>
          <NavLink to={"followers"}>
            {({ isActive }) => {
              return (
                <p className={`hover:underline ${isActive && "underline opacity-50"}`}>
                  <span className="font-bold">{followerQuery.data.length}</span> followers
                </p>
              );
            }}
          </NavLink>
          <NavLink to={"following"}>
            {({ isActive }) => {
              return (
                <p className={`hover:underline ${isActive && "underline opacity-50"}`}>
                  <span className="font-bold">{followingQuery.data.length}</span> following
                </p>
              );
            }}
          </NavLink>
        </div>
        <div className="flex flex-col gap-3  md:gap-0">
          <p className="font-bold">
            {firstName} {lastName} {job_role && `(${job_role})`}
          </p>
          {alumniDetails.data?.alumniData && (
            <div className="flex flex-col">
              <p>Year Graduated: {alumniDetails.data.alumniData.year_graduated}</p>
              <p>
                {alumniDetails.data.alumniData.program_name} ({alumniDetails.data.alumniData.school_name})
              </p>
            </div>
          )}
          {company && (
            <p className="flex items-center gap-2">
              <img className="w-5" src={companyIcon} alt="" />
              {company}
            </p>
          )}

          <p className="underline text-light_text flex items-center gap-2">
            <img className="w-5" src={emailIcon} alt="" />
            {email}
          </p>
          {phoneNumber && (
            <p className="underline text-light_text flex items-center gap-2">
              <img className="w-5" src={phoneIcon} alt="" />
              {phoneNumber}
            </p>
          )}
        </div>
        {bio && (
          <div className="max-w-[300px]">
            <p className="w-full break-words">Bio: {bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
