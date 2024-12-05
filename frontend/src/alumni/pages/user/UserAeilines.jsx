import React from "react";
import { useGetUserPosts } from "../../_api/@react-client-query/query";
import { useParams } from "react-router-dom";
import SimpleCardLoader from "../../components/cards/loaders/SimpleCardLoader";
import AelineCard from "../../components/cards/AelineCard";

const UserAeilines = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserPosts(id);

  if (isLoading) return <SimpleCardLoader />;

  const lines = data.filter((post) => post.postMedia.length == 0);

  return (
    <div className="max-w-[1200px] mx-auto mt-20">
      {lines.length == 0 ? (
        <div className="flex flex-col w-full justify-center items-center gap-5">
          <h1 className="font-bold">No post available!</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center max-w-[550px] mx-auto gap-20">
          {lines.map((post, index) => (
            <AelineCard key={index} postID={post.postID} caption={post.caption} userID={id} createdAt={post.createdAt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAeilines;
