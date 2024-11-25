import React, { useState } from "react";
import { timeAgo } from "../../../utils.js";

import comment from "../../../assets/comment.png";
import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";

import more_hor from "../../../assets/more_hor.png";
import { usePostInformation, useLikePost, useUnlikePost } from "../../_api/@react-client-query/query.js";
import AelineCardLoading from "./loaders/AelineCardLoading.jsx";

const AelineCard = ({ postID, caption, userID, createdAt }) => {
  const likePostQuery = useLikePost();
  const unlikePostQuery = useUnlikePost();
  const { isLoading, isError, data } = usePostInformation(postID);

  if (isLoading) {
    return <AelineCardLoading />;
  }

  const handleLike = () => {
    if (data.is_liked == 1) {
      unlikePostQuery.mutate(postID);
    } else {
      likePostQuery.mutate(postID);
    }
  };

  return (
    <div className="flex gap-7 w-full">
      <div className="flex items-start justify-start ">
        <img className="w-14 h-14 rounded-full object-cover" src={data.profile_link} alt="profile" />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <p className="font-bold text-lg -mb-2">{data.posted_by}</p>
        <p className="font-thin">{caption}</p>
        <div className="flex mt-4 gap-2 items-center">
          <button className="w-5 h-5" onClick={handleLike}>
            <img src={data.is_liked == 1 ? liked : unliked} alt="unliked" />
          </button>
          <button className="w-5 h-5">
            <img src={comment} alt="comment" />
          </button>
        </div>
        <button className="w-fit text-sm text-light_text">
          <p>{data ? data.total_replies : "0"} comments</p>
        </button>
      </div>
      <div className="flex items-start justify-center gap-2 ml-auto mt-2">
        <div className="flex gap-2">
          <p className="text-sm text-light_text">{timeAgo(createdAt)}</p>
          <button className="flex items-center justify-center">
            <img src={more_hor} alt="dots" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AelineCard;
