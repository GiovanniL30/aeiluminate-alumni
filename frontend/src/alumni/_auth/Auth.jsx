import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const { user } = useAuthContext();

  if (Object.keys(user).length == 0) return <Navigate to={`/login?error=${"Please Login First"}`} />;

  return <Outlet />;
};

export default Auth;
