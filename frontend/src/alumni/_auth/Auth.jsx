import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const { user, isLoading, isError } = useAuthContext();

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) {
    return <h1>Error fetching user data. Please try again later.</h1>;
  }

  if (Object.keys(user).length === 0) {
    return <Navigate to={`/login`} />;
  }

  return <Outlet />;
};

export default Auth;
