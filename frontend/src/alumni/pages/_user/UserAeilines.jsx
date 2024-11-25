import React from "react";
import { useGetPosts, useGetUserPosts } from "../../_api/@react-client-query/query";
import { useParams } from "react-router-dom";
import SimpleCardLoader from "../../components/_cards/loaders/SimpleCardLoader";
import AelineCard from "../../components/_cards/AelineCard";

const UserAeilines = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserPosts(id);

  if (isLoading) return <SimpleCardLoader />;

  const lines = data.filter((post) => post.postMedia.length == 0);

  console.log(lines);
  return (
    <div className="max-w-[1200px] mx-auto mt-20">
      <div className="flex flex-col justify-center items-center max-w-[500px] mx-auto gap-20">
        {lines.map((post, index) => (
          <AelineCard key={index} postID={post.postID} caption={post.caption} userID={id} createdAt={post.createdAt} />
        ))}
      </div>
    </div>
  );
};

export default UserAeilines;
