import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const Auth = createContext();

export const useAuthContext = () => useContext(Auth);

/**
 * user details provider
 *
 * @author Giovanni Leo
 */
const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : { user: null, token: null };
    } catch (err) {
      console.error("Failed to parse auth data:", err);
      return { user: null, token: null };
    }
  });

  useEffect(() => {
    if (auth.user || auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const setUser = (user) => setAuth((prev) => ({ ...prev, user }));
  const setToken = (token) => setAuth((prev) => ({ ...prev, token }));

  const value = useMemo(() => ({ ...auth, setUser, setToken }), [auth]);

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContext;
