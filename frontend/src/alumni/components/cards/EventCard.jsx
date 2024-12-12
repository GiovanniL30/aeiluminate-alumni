import React, { useState } from "react";
import { timeAgo } from "../../../utils.js";
import album_icon from "../../../assets/album-icon.png";
import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";
import more_vert from "../../../assets/more_vert.png";
import { ReadMore } from "../ReadMore";
import PostCardLoading from "./loaders/PostCardLoading.jsx";
import UserProfilePic from "../UserProfilePic.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import Button from "../Button.jsx";
import { NavLink } from "react-router-dom";
import { useMarkInterested, useUnmarkInterested, useEventInformation } from "../../alumni/_api/@react-client-query/query.js";
const EventCard = ({ eventID, title, desc, eventDateTime, location, eventType, createdOn, createdBy, imageUrl }) => {
  const markInterestedQuery = useMarkInterested();
  const unmarkInterestedQuery = useUnmarkInterested();
  const { isLoading, isError, data } = useEventInformation(eventID);
  const { user } = useAuthContext();
  if (isLoading) {
    return <PostCardLoading />;
  }
  const handleInterested = () => {
    if (data.is_interested == 1) {
      markInterestedQuery.mutate(eventID);
    } else {
      unmarkInterestedQuery.mutate(eventID);
    }
  };
  
  return (
    <div className={`h-fit w-full flex flex-col gap-5 p-3 rounded-xl my-shadow ${"pointer-events-none"} ${otherStyle}`}>
      <div className="flex flex-col sm:flex-row justify-between pt-4 px-4">
        <div className="relative flex items-center gap-2 sm:gap-6">
          <UserProfilePic userID={userID} profile_link={data.profile_link} />
          <p className="font-semibold">
            {data.posted_by}
            {user.userID === userID && <span className="text-primary_blue ml-1">(YOU)</span>}
          </p>
        </div>
        <div className="flex gap-3 items-center justify-between sm:justify-center mt-2 sm:mt-0">
          <p className="text-sm text-light_text">{timeAgo(createdOn)}</p>
          <button>
            <img className="w-1 h-4" src={more_vert} alt="dots" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2  flex-grow">
        <h1>{title}</h1>
        <ReadMore text={desc} id={eventID} />
        <div className="flex flex-col gap-2  flex-grow">
          <div className="flex flex-col gap-2  flex-grow">
            <div className="w-6 h-6">
              <img src={liked}/>
              <p>{location}</p>
            </div>
            <div className="w-6 h-6">
              <img src={liked}/>
              <p>{eventType}</p>
            </div>
            <div className="w-6 h-6">
              <img src={liked}/>
              <p>{eventDateTime}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 h-fit max-h-[500px] min-h-[250px]">
        <img className="" src={imageUrl}/>
      </div>
      <div className="flex flex-col gap-3 py-2">
        <div className="flex items-center gap-6">
          <button className="w-60 h-6 bg-blue-50" onClick={handleInterested}>
            <span className={markInterestedQuery ? "text-sm text-yellow-500" : "text-sm text-white-500"}>
              {markInterestedQuery ? "Interested" : "Light Up"}
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-2  flex-grow">
          <div className="flex gap-2">
            <p className="font-bold text-sm">{data ? data.total_interested : "0"} interested</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;