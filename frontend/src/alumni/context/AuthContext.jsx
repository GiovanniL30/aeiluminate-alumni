import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useGetUser } from "../_api/@react-client-query/query";

const Auth = createContext();

// Hook to access the Auth context
export const useAuthContext = () => useContext(Auth);

const AuthContext = ({ children }) => {
  // Initialize state with safe parsing and default values
  const [auth, setAuth] = useState(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : { user: null, token: null };
    } catch (err) {
      console.error("Failed to parse auth data:", err);
      return { user: null, token: null };
    }
  });

  // Effect to sync auth state with localStorage
  useEffect(() => {
    if (auth.user || auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  // Update user or token separately
  const setUser = (user) => setAuth((prev) => ({ ...prev, user }));
  const setToken = (token) => setAuth((prev) => ({ ...prev, token }));

  // Memoize context value to optimize re-renders
  const value = useMemo(() => ({ ...auth, setUser, setToken }), [auth]);

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContext;
