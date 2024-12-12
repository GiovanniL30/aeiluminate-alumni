import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

/**
 * Checks if user and token is present
 *
 * @author Giovanni Leo
 */
const Auth = () => {
  const { user, token } = useAuthContext();

  if (!user || !token) {
    return <Navigate to={`/login`} />;
  }

  return <Outlet />;
};

export default Auth;
