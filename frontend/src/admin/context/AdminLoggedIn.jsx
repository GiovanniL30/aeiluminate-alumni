import React, { createContext, useState, useEffect, useContext } from "react";

const LoggedInContext = createContext();

export const useLoginContext = () => {
  return useContext(LoggedInContext);
};

const AdminLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn_admin") === "true"
  );

  useEffect(() => {
    localStorage.setItem("loggedIn_admin", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export default AdminLoggedInProvider;
