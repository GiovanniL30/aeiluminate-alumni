import React from "react";
import ImageCarousel from "../ImageCarousel";
import Button from "../Button";

import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";

const PostCommentPopUp = ({ likes, isLiked, profilePic, handleLike, images, userID, userName, setIsShowComment, caption }) => {
  return (
    <div className="py-20 px-10 fixed left-0 right-0 top-0 bottom-0 min-h-screen bg-black bg-opacity-30 z-50 pointer-events-auto">
      <button className="fixed right-4 top-12 text-white font-bold text-xl" onClick={() => setIsShowComment(false)}>
        &#10005;
      </button>
      <div className="w-full h-full bg-white rounded-md flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-full max-h-[300px] lg:max-h-full bg-gray-300 bg-opacity-20">
          <ImageCarousel images={images} otherImageStyle="max-h-[300px] lg:max-h-full" />
        </div>

        <div className="px-4 w-full lg:w-1/2 h-full p-5 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-5">
              <img className="w-12 h-12 rounded-full object-cover" src={profilePic} alt="profile" />
              <div className="flex flex-col">
                <p className="font-semibold text-lg">{userName}</p>
                <p className="text-sm">Follower Count</p>
              </div>
              <Button text="Follow" otherStyle="ml-10" />
            </div>
            <div className="mt-8">
              <p>{caption}</p>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center min-h-[100px] overflow-y-auto">
            <p className="italic text-gray-500">No comments yet. Be the first to comment!</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <button className="w-6 h-6" onClick={handleLike}>
                <img src={isLiked ? liked : unliked} alt="like" />
              </button>
              <p>{likes} likes</p>
            </div>
            <textarea
              className="h-16 resize-none w-full focus:outline-none p-2 text-sm border-none rounded-md"
              placeholder="Add a comment..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCommentPopUp;
