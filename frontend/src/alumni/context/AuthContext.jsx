import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetUser } from "../_api/@react-client-query/query";

const Auth = createContext();

export const useAuthContext = () => useContext(Auth);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const { data, isLoading, isError, error, refetch } = useGetUser(user?.userID, {
    enabled: !!user?.userID,
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    if (isError && error?.response?.data?.tokenError) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser({});
    }
  }, [data, isError, error]);

  const fetchUser = () => {
    if (user?.userID) refetch();
  };

  return <Auth.Provider value={{ user, setUser, fetchUser, isLoading }}>{children}</Auth.Provider>;
};

export default AuthContext;
