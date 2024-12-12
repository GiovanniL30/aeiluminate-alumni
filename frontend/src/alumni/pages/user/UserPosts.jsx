import React, { useState } from "react";
import { useGetUserPosts } from "../../_api/@react-client-query/query";
import { useParams } from "react-router-dom";
import PostCard from "../../components/cards/PostCard";
import SimpleCardLoader from "../../components/cards/loaders/SimpleCardLoader";
import back from "../../../assets/back-arrow.png";

import album from "../../../assets/album-icon.png";
import { useAuthContext } from "../../context/AuthContext";

const UserPosts = () => {
  const { user } = useAuthContext();
  const [openPost, setOpenPost] = useState(false);
  const [postData, setPostData] = useState({});
  const { id } = useParams();

  const { data, isLoading } = useGetUserPosts(id);

  if (isLoading) return <SimpleCardLoader />;

  const posts = data.filter((post) => post.postMedia.length > 0);

  const handleOpenPost = (postId) => {
    const post = posts.filter((e) => e.postID == postId)[0];

    if (!post) {
      alert("Failed to open post");
      return;
    }
    setPostData({ albumId: post.albumId, caption: post.caption, postID: post.postID, images: post.postMedia, createdAt: post.createdAt });
    setOpenPost(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-20">
      {openPost ? (
        <div className=" flex max-w-[600px] flex-col mx-auto gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setOpenPost(false);
                setPostData({});
              }}
              className="hover-opacity flex items-center justify-center w-7 h-7"
            >
              <img src={back} alt="back" />
            </button>
            <p>Back to all post</p>
          </div>
          <PostCard
            isReload={true}
            canBeDelete={user.userID == id}
            albumId={postData.albumId}
            caption={postData.caption}
            postID={postData.postID}
            images={postData.images}
            userID={id}
            createdAt={postData.createdAt}
          />
        </div>
      ) : (
        <>
          {posts.length == 0 ? (
            <div className="flex flex-col w-full justify-center items-center gap-5">
              <h1 className="font-bold">No post available!</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div key={index} className="p-3 rounded-xl my-shadow relative">
                  <div>
                    <button className="hover-opacity w-full h-full" onClick={() => handleOpenPost(post.postID)}>
                      <img src={post.postMedia[0].mediaURL} alt="Post media" className="w-full h-[300px] object-cover" />
                    </button>
                  </div>
                  {post.albumId && <img src={album} className="absolute top-5 right-5" />}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserPosts;
