import React, { useState } from "react";
import { timeAgo } from "../../../utils.js";
import comment from "../../../assets/comment.png";
import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";
import more_hor from "../../../assets/more_hor.png";
import { usePostInformation, useLikePost, useUnlikePost, useDeletePost } from "../../_api/@react-client-query/query.js";
import AelineCardLoading from "./loaders/AelineCardLoading.jsx";
import CommentPopUp from "./CommentPopUp.jsx";
import UserProfilePic from "../UserProfilePic.jsx";
import { ReadMore } from "../ReadMore.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import ToastNotification from "../../constants/toastNotification.js";
import Button from "../Button.jsx";

/**
 * Aeline Card
 *
 * @author Giovanni Leo
 */
const AelineCard = ({ isReload = false, canBeDelete = false, postID, caption, userID, createdAt }) => {
  const [showDelete, setShowDelete] = useState(false);
  const { user } = useAuthContext();
  const [isShowComment, setIsShowComment] = useState(false);
  const likePostQuery = useLikePost();
  const unlikePostQuery = useUnlikePost();
  const { isLoading, isError, data } = usePostInformation(postID);
  const deletePost = useDeletePost();

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

  const handleDelete = () => {
    deletePost.mutate(postID, {
      onSuccess: () => {
        ToastNotification.success("Post Deleted");
        if (isReload) {
          window.location.reload();
        }
      },
      onError: (error) => {
        console.log(error);
        ToastNotification.error("Post not deleted: " + error.message);
      },
    });
  };

  return (
    <div className="flex flex-col md:gap-8 p-3 rounded-xl my-shadow w-full">
      {isShowComment && (
        <CommentPopUp
          postId={postID}
          profilePic={data.profile_link}
          handleLike={handleLike}
          images={null}
          userID={userID}
          userName={data.posted_by}
          setIsShowComment={setIsShowComment}
          caption={caption}
          isLiked={data.is_liked}
          likes={data.total_likes}
        />
      )}
      <div className="flex items-start justify-start">
        <div className="flex items-center gap-3">
          <UserProfilePic profile_link={data.profile_link} userID={userID} otherImageStyle="w-10 h-10 md:w-12 md:h-12" />
          <p className="font-bold text-lg">
            {data.posted_by} {user.userID === userID && <span className="text-primary_blue ml-1">(YOU)</span>}
          </p>
        </div>
        <div className="hidden md:flex items-start justify-center gap-2 ml-auto mt-2">
          <div className="flex gap-2 relative">
            <p className="text-sm text-light_text">{timeAgo(createdAt)}</p>
            {(user.userID === userID || user.role == "Admin" || user.role == "Manager" || canBeDelete) && (
              <button onClick={() => setShowDelete((prev) => !prev)}>
                <img src={more_hor} alt="dots" />
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
      </div>
      <div className="flex flex-col gap-2 mt-0">
        <div className="w-full">
          <ReadMore text={caption} />
        </div>

        <div className="flex md:hidden gap-2">
          <div className="flex gap-2 justify-between w-full">
            <p className="text-sm text-light_text">{timeAgo(createdAt)}</p>
            <button className="flex items-center justify-center">
              <img src={more_hor} alt="dots" />
            </button>
          </div>
        </div>

        <div className="flex mt-4 gap-2 items-center">
          <button disabled={likePostQuery.isPending || unlikePostQuery.isPending} className="w-5 h-5" onClick={handleLike}>
            <img src={data.is_liked == 1 ? liked : unliked} alt="unliked" />
          </button>
          <button className="w-5 h-5" onClick={() => setIsShowComment(true)}>
            <img src={comment} alt="comment" />
          </button>
        </div>

        <div className="flex gap-2 mt-2 text-sm text-light_text">
          <p>{data ? data.total_likes : "0"} likes</p>
          <p>{data ? data.total_replies : "0"} comments</p>
        </div>
      </div>
    </div>
  );
};

export default AelineCard;
