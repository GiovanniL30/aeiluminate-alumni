import React, { useState } from "react";
import { timeAgo } from "../../../utils.js";

import logo from "../../../assets/logoCircle.png";

import comment from "../../../assets/comment.png";
import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";
import more_vert from "../../../assets/more_vert.png";

import ImageCarousel from "../ImageCarousel";
import { ReadMore } from "../ReadMore";
import { usePostInformation } from "../../_api/@react-client-query/query.js";

const PostCard = ({ postID, caption, images, userID, createdAt }) => {
  const { isLoading, isError, data } = usePostInformation(postID);
  const [likedState, setLikedState] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className="w-full flex flex-col gap-5 border-[1px] rounded-lg">
      <div className="flex justify-between pt-4 px-4">
        <div className="flex items-center gap-6">
          <img className="w-10 h-10 object-cover rounded-full" src={data.profile_link} alt="profile" />
          <p className="font-bold">{data.posted_by}</p>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <p className="text-sm text-light_text">{timeAgo(createdAt)}</p>
          <button>
            <img className="w-1 h-4" src={more_vert} alt="dots" />
          </button>
        </div>
      </div>
      <div className="bg-gray-50 h-fit max-h-[500px] min-h-[250px]">
        <ImageCarousel images={images} />
      </div>
      <div className="flex items-center px-4 gap-6">
        <button className="w-6 h-6">
          <img src={likedState ? liked : unliked} alt="like/unlike" />
        </button>
        <button className="w-6 h-6">
          <img src={comment} alt="comment" />
        </button>
      </div>
      <div className="flex flex-col gap-2 px-4 pb-4">
        <p className="font-bold text-sm">{data ? data.total_likes : "0"} likes</p>
        <ReadMore text={caption} id={postID} />
      </div>
    </div>
  );
};

export default PostCard;
