import React from "react";
import { useAlbumInformation, useAlbumPosts } from "../../_api/@react-client-query/query";
import { NavLink } from "react-router-dom";
import UserProfilePic from "../UserProfilePic";
import plus from "../../../assets/plus.png";
import { useAuthContext } from "../../context/AuthContext";
import PostCardLoading from "./loaders/PostCardLoading";

const AlbumCard = ({ albumId, albumTitle }) => {
  const albumPosts = useAlbumPosts(albumId);
  const albumInfo = useAlbumInformation(albumId);
  const { user } = useAuthContext();

  if (albumPosts.isLoading || albumInfo.isLoading) return <PostCardLoading />;

  const firstPostImage = albumPosts.data && albumPosts.data[0] ? albumPosts.data[0].mediaURL : null;

  return (
    <div className="border p-4 rounded-lg shadow-md w-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <UserProfilePic userID={albumInfo.data.userId} profile_link={albumInfo.data.profilePic} />
        <p className="font-semibold">
          {albumInfo.data.username} {user.userID == albumInfo.data.userId && <span className="text-primary_blue">(YOU)</span>}
        </p>
      </div>

      <NavLink to={`/album/${albumId}`} className="w-full group">
        <div className="relative w-full">
          <img src={firstPostImage} alt="First post" className="w-full h-64 object-cover rounded-lg mb-4" />
          <div className="absolute top-0 left-0 right-0 bottom-0 group-hover:bg-black group-hover:bg-opacity-40 duration-200"></div>
          <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-[#9EC0D7] bg-opacity-50 rounded-md">
            <div className="flex flex-col items-center w-full justify-center p-3">
              <img src={plus} alt="Plus icon" className="mb-2" />
              <h1 className="text-white text-center text-sm md:text-base truncate max-w-full">{albumTitle}</h1>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default AlbumCard;
