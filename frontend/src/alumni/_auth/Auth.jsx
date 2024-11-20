import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/check_token`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setUser({});
          navigate(`/login?error=${data.message || "Please login first"}`);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Token check failed:", error);
        navigate(`/login?error=${error.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(user).length === 0) {
    return <Navigate to={`/login?error=${"Please Login First"}`} />;
  }

  return <Outlet />;
};

export default Auth;
