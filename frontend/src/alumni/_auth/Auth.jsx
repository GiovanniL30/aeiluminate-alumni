import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const { user, token } = useAuthContext();

  if (!user || !token) {
    return <Navigate to={`/login`} />;
  }

  return <Outlet />;
};

export default Auth;
