import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
  const isLoggedIn = true;

  console.log(isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/admin/login" />;

  return <Outlet />;
};

export default AdminAuth;
