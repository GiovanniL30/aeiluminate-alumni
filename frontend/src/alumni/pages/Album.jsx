import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAlbumInformation, useAlbumPosts } from "../_api/@react-client-query/query";
import PostCard from "../components/cards/PostCard";
import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";
import back from "../../assets/back-arrow.png";

const Album = () => {
  const { albumId } = useParams();

  const { user } = useAuthContext();
  const albumInfo = useAlbumInformation(albumId);
  const albumPosts = useAlbumPosts(albumId);

  if (albumPosts.isLoading || albumInfo.isLoading) return <h1>Loading...</h1>;
  if (albumPosts.error || albumInfo.isError) return <h1>Error loading album posts</h1>;

  const groupPostsById = (posts) => {
    const groupedPosts = {};

    if (Array.isArray(posts)) {
      posts.forEach((post) => {
        const { postID, userID, createdAt, mediaURL } = post;

        if (!groupedPosts[postID]) {
          groupedPosts[postID] = {
            postID,
            userID,
            createdAt,
            mediaURLs: [],
          };
        }

        groupedPosts[postID].mediaURLs.push(mediaURL);
      });
    }

    return Object.values(groupedPosts);
  };

  const posts = albumPosts.data ? groupPostsById(albumPosts.data) : [];

  return (
    <div className="p-2 w-full flex flex-col gap-10 mt-10">
      <div className="flex justify-center flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">
          {albumInfo.data.userId === user.userID ? "Your album" : `${albumInfo.data.firstName} ${albumInfo.data.lastName}`}
        </h1>
        <h1 className="text-center text-xl font-bold text-light_text">{albumInfo.data.albumTitle}</h1>
        <NavLink to={`/album/contribute/${albumId}`}>
          <Button text="Contribute" />
        </NavLink>
      </div>

      <div>
        <NavLink to="/">
          <div className="flex items-center gap-3 hover-opacity">
            <img className="w-6" src={back} alt="" />
            <p>Return</p>
          </div>
        </NavLink>
        <h1 className="font-bold text-light_text mt-8">Posts:</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.postID} postID={post.postID} caption={""} createdAt={post.createdAt} userID={post.userID} images={post.mediaURLs} />
            ))
          ) : (
            <p>No posts available for this album</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Album;
