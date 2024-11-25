import React, { useState } from "react";
import { timeAgo } from "../../../utils.js";

import logo from "../../../assets/logoCircle.png";

import comment from "../../../assets/comment.png";
import liked from "../../../assets/post-liked.png";
import unliked from "../../../assets/post-unliked.png";
import more_vert from "../../../assets/more_vert.png";

import ImageCarousel from "../ImageCarousel";
import { ReadMore } from "../ReadMore";
import {
  useGetUser,
  useGetUserPosts,
  useLikePost,
  usePostInformation,
  useUnlikePost,
  useUserFollower,
  useUserFollowing,
} from "../../_api/@react-client-query/query.js";
import PostCardLoading from "./loaders/PostCardLoading.jsx";
import PostCommentPopUp from "./PostCommentPopUp.jsx";
import { NavLink } from "react-router-dom";

const PostCard = ({ postID, caption, images, userID, createdAt }) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const likePostQuery = useLikePost();
  const unlikePostQuery = useUnlikePost();
  const { isLoading, isError, data } = usePostInformation(postID);

  const followingQuery = useUserFollowing(userID);
  const followerQuery = useUserFollower(userID);
  const userPostsQuery = useGetUserPosts(userID);
  const userQuery = useGetUser(userID);

  if (isLoading || followingQuery.isLoading || followerQuery.isLoading || userPostsQuery.isLoading || userQuery.isLoading) {
    return <PostCardLoading />;
  }

  const handleLike = () => {
    if (data.is_liked == 1) {
      unlikePostQuery.mutate(postID);
    } else {
      likePostQuery.mutate(postID);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-5 border-[1px] rounded-lg ${isShowComment && "pointer-events-none"}`}>
      {isShowComment && (
        <PostCommentPopUp
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

      <div className="flex justify-between pt-4 px-4">
        <div className="relative flex items-center gap-6 group">
          <NavLink to={`../user/${userID}`} className="hover-opacity group-hover:opacity-100">
            <img className="w-10 h-10 object-cover rounded-full" src={data.profile_link} alt="profile" />
          </NavLink>
          <p className="font-bold">{data.posted_by}</p>

          <div className="pointer-events-none absolute bg-white top-14 left-5 z-20 flex flex-col p-4 w-80 rounded-lg shadow-2xl border-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-5 items-center">
              <div>
                <p className="text-sm text-light_text">
                  {userQuery.data.user.firstName} {userQuery.data.user.lastName}
                </p>
              </div>
            </div>
            <div className="flex self-center mt-4 gap-4 font-semibold">
              <p>{userPostsQuery.data.length} posts</p>
              <p>{followerQuery.data.length} followers</p>
              <p>{followingQuery.data.length} following</p>
            </div>
          </div>
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
        <button className="w-6 h-6" onClick={handleLike}>
          <img src={data.is_liked == 1 ? liked : unliked} alt="like/unlike" />
        </button>
        <button className="w-6 h-6" onClick={() => setIsShowComment(true)}>
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
