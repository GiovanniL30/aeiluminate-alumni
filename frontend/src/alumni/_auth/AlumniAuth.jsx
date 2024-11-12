import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AlumniAuth = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) return <Navigate to="/signin" />;

  return <Outlet />;
};

export default AlumniAuth;
