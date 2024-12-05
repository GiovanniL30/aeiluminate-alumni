import React, { useState } from "react";
import ImageCarousel from "../posts/ImageCarousel.jsx";
import Button from "../Button";

import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";
import { useAddComment, useComments, useFollowUser, useIsFollowing, useUnFollowUser, useUserFollower } from "../../_api/@react-client-query/query";
import PostCommentLoading from "./loaders/PostCommentLoading";
import CommentBlock from "./CommentBlock";
import { useParams } from "react-router-dom";
import UserProfilePic from "../UserProfilePic";
import { ReadMore } from "../ReadMore";
import { useAuthContext } from "../../context/AuthContext";

const CommentPopUp = ({ postId, likes, isLiked, profilePic, handleLike, images, userID, userName, setIsShowComment, caption }) => {
  const [commentData, setCommentData] = useState("");
  const followerQuery = useUserFollower(userID);
  const followUserQuery = useFollowUser();
  const unFollowUserQuery = useUnFollowUser();
  const isFollowingQuery = useIsFollowing(userID);
  const addCommentQuery = useAddComment();
  const commentsQuery = useComments(postId);
  const { user } = useAuthContext();

  const followHandler = () => {
    if (isFollowingQuery.data.isFollowing) {
      unFollowUserQuery.mutate(userID);
    } else {
      followUserQuery.mutate(userID);
    }
  };

  const submitComment = () => {
    if (commentData.length < 10) {
      alert("Comment should be at least 10 characters");
      return;
    }

    addCommentQuery.mutate({ content: commentData, postId });
    setCommentData("");
  };

  if (isFollowingQuery.isLoading || commentsQuery.isLoading) return <PostCommentLoading />;

  return (
    <div className="py-20 px-10 fixed left-0 right-0 top-0 bottom-0 min-h-screen bg-black bg-opacity-30 z-50 pointer-events-auto">
      <div
        className={`w-full h-full bg-white rounded-md overflow-hidden ${
          images ? "flex flex-col lg:flex-row" : "flex flex-row max-w-[600px] mx-auto"
        }`}
      >
        {images && (
          <div className="w-full lg:w-1/2 h-[300px] lg:h-full bg-gray-300 bg-opacity-20">
            <ImageCarousel images={images} otherImageStyle="h-full" />
          </div>
        )}

        <div className={`flex flex-col ${images ? "lg:w-1/2" : "w-full"} h-full`}>
          <div className="relative flex-grow overflow-y-auto p-5">
            <button
              className="absolute right-4 top-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover-opacity"
              onClick={() => setIsShowComment(false)}
            >
              &#10005;
            </button>
            <div className="flex items-center gap-5">
              <UserProfilePic userID={userID} profile_link={profilePic} />
              <div className="flex flex-col">
                <p className="font-semibold text-lg">{userName}</p>
                <p className="text-sm">{followerQuery.data ? followerQuery.data.length : "0"} followers</p>
              </div>
              {user.userID != userID && (
                <Button
                  onClick={followHandler}
                  text={isFollowingQuery.data.isFollowing || followerQuery.isFetching ? "Unfollow" : "Follow"}
                  disabled={followUserQuery.isPending || unFollowUserQuery.isPending || followerQuery.isFetching}
                  otherStyle={`ml-10 ${isFollowingQuery.data.isFollowing && "bg-red-500 disabled"}`}
                />
              )}
            </div>
            <div className="mt-8">
              <ReadMore text={caption} />
            </div>

            {commentsQuery.data.length > 0 && <p className="font-bold mt-4">Comments</p>}

            <div className="flex flex-col gap-5 mt-5 pb-[320px]">
              {commentsQuery.data.length > 0 ? (
                commentsQuery.data.map((comment) => (
                  <CommentBlock
                    key={comment.commentID}
                    userProfilePic={comment.userProfilePic}
                    userID={comment.userID}
                    userName={comment.userName}
                    commentID={comment.commentID}
                    commentCreatedAt={comment.commentCreatedAt}
                    commentContent={comment.commentContent}
                  />
                ))
              ) : (
                <p className="italic text-gray-500 text-center mt-20">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>

          <div className="p-4 bg-white sticky bottom-0">
            <div className="flex items-center gap-2 mb-2">
              <button className="w-5 h-5 md:w-6 md:h-6" onClick={handleLike}>
                <img src={isLiked ? liked : unliked} alt="like" />
              </button>
              <p>{likes} likes</p>
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                value={commentData}
                onChange={(e) => setCommentData(e.target.value)}
                className="h-16 resize-none w-full focus:outline-none p-2 text-sm border border-gray-300 rounded-md"
                placeholder="Add a comment..."
              ></textarea>
              <Button
                onClick={submitComment}
                disabled={addCommentQuery.isPending}
                text={addCommentQuery.isPending ? "Adding Comment ..." : "Add Comment"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPopUp;
