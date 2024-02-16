import React, { createContext, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

const initialValue = socket;

const SocketContext = createContext(initialValue);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  socket.on("connect", () => {
    setLoading(false);
  });

  if (loading) return null;

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, SocketContext };
