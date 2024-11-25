import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "../_api/@react-client-query/query";

const Auth = createContext();

export const useAuthContext = () => useContext(Auth);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const { data, isLoading, isError, error, refetch } = useUser();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        const tokenError = error?.response?.data?.tokenError;

        if (tokenError) {
          setUser({});
        }
      } else if (data?.user) {
        setUser(data.user);
      }
    }
  }, [data, isLoading, isError, error]);

  const fetchUser = () => {
    refetch();
  };

  return <Auth.Provider value={{ user, setUser, fetchUser, isLoading }}>{children}</Auth.Provider>;
};

export default AuthContext;
