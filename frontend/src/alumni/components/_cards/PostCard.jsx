import React from "react";

import logo from "../../../assets/logoCircle.png";

import comment from "../../../assets/comment.png";
import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";

import more_vert from "../../../assets/more_vert.png";

const PostCard = ({ postID, caption, images, userID, createdAt }) => {
  return (
    <div className="w-full flex flex-col gap-5 border-[1px]  rounded-lg">
      <div className="flex justify-between p-4">
        <div className="flex items-center gap-6">
          <img className="w-10" src={logo} alt="profile" />
          <p className="font-bold">{userID}</p>
        </div>
        <button>
          <img className="w-1 h-4" src={more_vert} alt="dots" />
        </button>
      </div>
      <div className="bg-blue-50 h-[500px]">
        {images.map((image, index) => {
          return <h1 key={index}>{image.mediaURL}</h1>;
        })}
      </div>
      <div className="flex items-center px-4 gap-6">
        <button className="w-6 h-6">
          <img src={unliked} alt="unlike" />
        </button>
        <button className="w-6 h-6">
          <img src={comment} alt="comment" />
        </button>
      </div>
      <div className="flex flex-col gap-2 px-4 pb-4">
        <p className="font-bold text-sm">12,542 Likes</p>
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default PostCard;
