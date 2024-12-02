import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { user } = useAuthContext();

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_BASE_URL);

    socket.current.emit("register", user.userID, () => {
      console.log("Socket connected:", socket.current.id);
    });

    return () => {
      if (socket.current) {
        socket.current.emit("unregister", user.userID);
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [user]);

  return <SocketContext.Provider value={socket.current}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
