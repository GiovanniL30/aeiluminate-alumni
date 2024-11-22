import React, { useState } from "react";
import ImageCarousel from "../ImageCarousel";
import Button from "../Button";

import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";
import { useAddComment, useComments, useFollowUser, useIsFollowing, useUnFollowUser, useUserFollower } from "../../_api/@react-client-query/query";
import PostCommentLoading from "./PostCommentLoading";
import CommentBlock from "./CommentBlock";
import { useParams } from "react-router-dom";

const PostCommentPopUp = ({ postId, likes, isLiked, profilePic, handleLike, images, userID, userName, setIsShowComment, caption }) => {
  const { id } = useParams();
  const [commentData, setCommentData] = useState("");
  const followerQuery = useUserFollower(userID);
  const followUserQuery = useFollowUser();
  const unFollowUserQuery = useUnFollowUser();
  const isFollowingQuery = useIsFollowing(userID);
  const addCommentQuery = useAddComment();
  const commentsQuery = useComments(postId);

  const followHandler = () => {
    if (isFollowingQuery.data.isFollowing) {
      unFollowUserQuery.mutate(userID);
    } else {
      followUserQuery.mutate(userID);
    }
  };

  const submitComment = () => {
    if (commentData.length < 10) {
      alert("Comment should be atleast 10 characters");
      return;
    }

    addCommentQuery.mutate({ content: commentData, postId });
    setCommentData("");
  };

  if (isFollowingQuery.isLoading || commentsQuery.isLoading) return <PostCommentLoading />;

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
                <p className="text-sm">{followerQuery.data ? followerQuery.data.length : "0"} followers</p>
              </div>
              {!id && (
                <Button
                  onClick={followHandler}
                  text={isFollowingQuery.data.isFollowing || followerQuery.isFetching ? "Unfollow" : "Follow"}
                  disabled={followUserQuery.isPending || unFollowUserQuery.isPending || followerQuery.isFetching}
                  otherStyle={`ml-10 ${isFollowingQuery.data.isFollowing && "bg-red-500 disabled"}`}
                />
              )}
            </div>
            <div className="mt-8">
              <p>{caption}</p>
            </div>
          </div>

          {commentsQuery.data.length > 0 && <p className="font-bold mt-4">Comments</p>}

          <div className="flex-grow flex  min-h-[100px] overflow-y-auto">
            {commentsQuery.data.length > 0 ? (
              <div className="flex flex-col gap-5 p-7">
                {commentsQuery.data.map((comment) => (
                  <CommentBlock
                    key={comment.commentID}
                    userProfilePic={comment.userProfilePic}
                    userID={comment.userID}
                    userName={comment.userName}
                    commentID={comment.commentID}
                    commentCreatedAt={comment.commentCreatedAt}
                    commentContent={comment.commentContent}
                  />
                ))}
              </div>
            ) : (
              <p className="italic text-gray-500 flex justify-center items-center w-full h-full">No comments yet. Be the first to comment!</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-4">
              <button className="w-6 h-6" onClick={handleLike}>
                <img src={isLiked ? liked : unliked} alt="like" />
              </button>
              <p>{likes} likes</p>
            </div>
            <textarea
              value={commentData}
              onChange={(e) => setCommentData(e.target.value)}
              className="h-16 resize-none w-full focus:outline-none p-2 text-sm border-none rounded-md"
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
  );
};

export default PostCommentPopUp;
