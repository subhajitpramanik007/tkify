import { useSession } from "@/hooks/use-session";
import * as React from "react";
import io, { Socket } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_API_URL;

interface State {
  socket: Socket | null;
  onlineUserIds: string[];
}

const SocketContext = React.createContext<State | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [onlineUserIds, setOnlineUserIds] = React.useState<string[]>([]);
  const { isAuthenticated, session } = useSession();

  React.useEffect(() => {
    if (!isAuthenticated) return;

    const newSocket = io(SERVER_URL, {
      query: { userId: session.user?._id }
    });
    setSocket(newSocket);

    newSocket.on("get_online_users", (userIds: string[]) => {
      setOnlineUserIds(userIds);
    });

    return () => {
      newSocket.close();

      setSocket(null);
      setOnlineUserIds([]);
    };
  }, [isAuthenticated]);

  return <SocketContext.Provider value={{ socket, onlineUserIds }}>{children}</SocketContext.Provider>;
};

const useSocket = () => {
  const socket = React.useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return socket;
};

export { SocketProvider, useSocket };
