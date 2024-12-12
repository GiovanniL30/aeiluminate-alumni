import React, { useState } from "react";
import { timeAgo } from "../../../utils.js";

import album_icon from "../../../assets/album-icon.png";

import comment from "../../../assets/comment.png";
import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";
import more_vert from "../../../assets/more_vert.png";

import ImageCarousel from "../posts/ImageCarousel.jsx";
import { ReadMore } from "../ReadMore";
import { useDeletePost, useLikePost, usePostInformation, useUnlikePost } from "../../_api/@react-client-query/query.js";
import PostCardLoading from "./loaders/PostCardLoading.jsx";
import CommentPopUp from "./CommentPopUp.jsx";
import UserProfilePic from "../UserProfilePic.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import Button from "../Button.jsx";
import { NavLink } from "react-router-dom";
import ToastNotification from "../../constants/toastNotification.js";

const PostCard = ({ isReload = false, canBeDelete = false, albumId = null, postID, caption, images, userID, createdAt, otherStyle }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const likePostQuery = useLikePost();
  const unlikePostQuery = useUnlikePost();
  const { isLoading, isError, data } = usePostInformation(postID);
  const { user } = useAuthContext();
  const deletPost = useDeletePost();

  if (isLoading) {
    return <PostCardLoading />;
  }

  const handleLike = () => {
    if (data.is_liked == 1) {
      unlikePostQuery.mutate(postID);
    } else {
      likePostQuery.mutate(postID);
    }
  };

  const handleDelete = () => {
    deletPost.mutate(postID, {
      onSuccess: () => {
        if (isReload) {
          window.location.reload();
        }
        ToastNotification.success("Post Deleted");
      },
      onError: (error) => {
        console.log(error);
        ToastNotification.error("Post not deleted: " + error.message);
      },
    });
  };

  return (
    <div className={`h-fit w-full flex flex-col gap-5 p-3 rounded-xl my-shadow ${isShowComment && "pointer-events-none"} ${otherStyle}`}>
      {isShowComment && (
        <CommentPopUp
          postId={postID}
          profilePic={data.profile_link}
          handleLike={handleLike}
          images={images}
          userID={userID}
          userName={data.posted_by}
          setIsShowComment={setIsShowComment}
          caption={caption}
          isLiked={data.is_liked}
          likes={data.total_likes}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between pt-4 px-4">
        <div className="relative flex items-center gap-2 sm:gap-6">
          <UserProfilePic userID={userID} profile_link={data.profile_link} />
          <p className="font-semibold">
            {data.posted_by}
            {user.userID === userID && <span className="text-primary_blue ml-1">(YOU)</span>}
          </p>
        </div>

        <div className="flex gap-3 items-center justify-between sm:justify-center mt-2 sm:mt-0 relative">
          <p className="text-sm text-light_text">{timeAgo(createdAt)}</p>
          {(user.userID === userID || user.role == "Admin" || user.role == "Manager" || canBeDelete) && (
            <button onClick={() => setShowDelete((prev) => !prev)}>
              <img className="w-1 h-4" src={more_vert} alt="dots" />
            </button>
          )}
          {showDelete && (
            <div className="top-10 z-50 absolute bg-white my-shadow flex flex-col items-center w-[150px] right-3 p-2 gap-2 rounded-mdl">
              <Button onClick={handleDelete} text="Delete Post" otherStyle="w-full" />
              <Button onClick={() => setShowDelete(false)} text="Cancel" otherStyle="w-full bg-red-500" />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 h-fit max-h-[500px] min-h-[250px]">
        <ImageCarousel images={images} />
      </div>

      <div className="flex flex-col gap-3 py-2">
        {albumId && (
          <div>
            <NavLink to={`/album/${albumId}`}>
              <Button text="Visit album" />
            </NavLink>
          </div>
        )}
        <div className="flex items-center gap-6">
          <button className="w-6 h-6" onClick={handleLike}>
            <img src={data.is_liked == 1 ? liked : unliked} alt="like/unlike" />
          </button>
          <button className="w-6 h-6" onClick={() => setIsShowComment(true)}>
            <img src={comment} alt="comment" />
          </button>
        </div>

        <div className="flex flex-col gap-2  flex-grow">
          <div className="flex gap-2">
            <p className="font-bold text-sm">{data ? data.total_likes : "0"} likes</p>
            <p className="font-bold text-sm">{data ? data.total_replies : "0"} comments</p>
          </div>
          <ReadMore text={caption} id={postID} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
