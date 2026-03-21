import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Url } from "src/url/url";

const SocketContext = createContext();
// console.log("SocketContext",SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connectSocket = ()=>{
    const token = localStorage.getItem("token");
if (!token){
    return
}

        const socketInstance = io(`${Url}`, {
            query: { token },
          });
    
          socketInstance.on("connect", () => {
            setSocket(socketInstance);
            // console.log("Connected to socket server");
          });
    
          
    
    
  }

  useEffect(() => {
    connectSocket()
      return () => {
        socket.disconnect();
      };
    
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket ,connectSocket}}> 
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
