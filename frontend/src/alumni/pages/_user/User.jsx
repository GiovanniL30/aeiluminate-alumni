import React, { useState } from "react";
import { useGetUserPosts } from "../../_api/@react-client-query/query";
import { useParams } from "react-router-dom";
import PostCard from "../../components/_cards/PostCard";
import { useAuthContext } from "../../context/AuthContext";
import SimpleCardLoader from "../../components/_cards/loaders/SimpleCardLoader";

const User = () => {
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
    setPostData({ caption: post.caption, postID: post.postID, images: post.postMedia, createdAt: post.createdAt });
    setOpenPost(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-20">
      {openPost ? (
        <div className=" flex max-w-[600px] mx-auto relative">
          <div className="absolute -top-14 -left-[5%] flex items-center gap-2">
            <button
              onClick={() => {
                setOpenPost(false);
                setPostData({});
              }}
              className="hover-opacity flex items-center justify-center w-7 h-7  rounded-md  text-white bg-black font-bold text-sm"
            >
              &#60;
            </button>
            <p>Back to all post</p>
          </div>
          <PostCard caption={postData.caption} postID={postData.postID} images={postData.images} userID={id} createdAt={postData.createdAt} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div key={index}>
              <div>
                <button className="hover-opacity w-full h-full" onClick={() => handleOpenPost(post.postID)}>
                  <img src={post.postMedia[0].mediaURL} alt="Post media" className="w-full h-[300px] object-cover" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
