import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <h1>Loading...</h1>;

  if (Object.keys(user).length === 0) {
    return <Navigate to={`/login?error=${"Please Login First"}`} />;
  }

  return <Outlet />;
};

export default Auth;
