import React, { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

export const useAuthContext = () => useContext(Auth);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return <Auth.Provider value={{ user, setUser }}>{children}</Auth.Provider>;
};

export default AuthContext;
