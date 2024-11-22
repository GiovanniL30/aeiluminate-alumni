import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useUser } from "../_api/@react-client-query/query";

const Auth = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        if (error.response?.data?.tokenError) {
          setUser({});
          navigate(`/login?error=${errorMessage}`);
        }
      } else if (data?.user) {
        setUser(data.user);
      }
    }
  }, [data, isLoading, isError, error, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(user).length === 0) {
    return <Navigate to={`/login?error=${"Please Login First"}`} />;
  }

  return <Outlet />;
};

export default Auth;
