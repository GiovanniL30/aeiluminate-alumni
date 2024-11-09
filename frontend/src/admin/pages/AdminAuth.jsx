import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) return <Navigate to="/admin/login" />;

  return <Outlet />;
};

export default AdminAuth;
