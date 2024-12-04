import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Outlet, useParams } from "react-router-dom";
import Private from "./Private";
import { useGetUser, useIsFollowing } from "../../_api/@react-client-query/query";

const PrivateProtected = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const following = useIsFollowing(id);
  const followingUser = useGetUser(id);

  if (following.isLoading || followingUser.isLoading) return <h1>Loading...</h1>;

  if (user.userID !== id && followingUser.data.user.isPrivate === 1) {
    if (!following.data.isFollowing) {
      return <Private />;
    }
  }

  return <Outlet />;
};

export default PrivateProtected;
