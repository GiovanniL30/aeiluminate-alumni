import React from "react";
import { useParams } from "react-router-dom";
import { useUserFollowing } from "../../_api/@react-client-query/query";
import FollowList from "../../components/FollowList";

const UsersFollowing = () => {
  const { id } = useParams();

  const { data, isLoading } = useUserFollowing(id);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-[1000px] mx-auto mt-20">
      <h1 className="font-bold text-lg mb-5">Following ({data.length})</h1>
      <FollowList data={data} />
    </div>
  );
};

export default UsersFollowing;
