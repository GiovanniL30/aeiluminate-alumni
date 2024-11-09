import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLoginContext } from "../context/LoggedIn";

const AdminAuth = () => {
  const { isLoggedIn } = useLoginContext();

  console.log(isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/admin/login" />;

  return <Outlet />;
};

export default AdminAuth;
