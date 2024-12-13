import * as React from "react";
import { TMessage, TUser } from "@/lib/types";
import { useSocket } from "./SocketProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, getOnlineUsers, sendMessage as send } from "@/services/message.services";

export type MobilePage = "chat" | "contacts";

interface ChatState {
  messages: TMessage[];
  currentChatToUser: TUser | undefined;
  isUserOnline: boolean;
  users: {
    onlineUsers: TUser[];
    offlineUsers: TUser[];
  };
  mobilePage: MobilePage;
}

interface ChatActions {
  changeUserToChat: (userId: string) => void;
  sendMessage: ({ receiverId, formData }: { receiverId: string; formData: FormData }) => Promise<void>;
  subscribeToNewMessages: () => void;
  unsubscribeFromNewMessages: () => void;
  changeMobilePage: (page: MobilePage) => void;
}

const ChatStateContext = React.createContext<ChatState | undefined>(undefined);
const ChatActionsContext = React.createContext<ChatActions | undefined>(undefined);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { onlineUserIds, socket } = useSocket();

  const [mobilePage, setMobilePage] = React.useState<MobilePage>("contacts");

  const [messages, setMessages] = React.useState<TMessage[]>([]);
  const [currentChatToUser, setCurrentChatToUser] = React.useState<TUser>();

  function changeMobilePage(page: MobilePage) {
    setMobilePage(page);
    setCurrentChatToUser(undefined);
  }

  const changeUserToChat = (userId: string) => {
    if (currentChatToUser?._id === userId) {
      setCurrentChatToUser(undefined);
      return;
    }

    if (!userId) {
      setCurrentChatToUser(undefined);
      return;
    }

    const user = data?.users.find((user) => user._id === userId);
    setCurrentChatToUser(user);
    setMobilePage("chat");

    mutate(userId);
  };

  const { mutateAsync: sendMessage } = useMutation({
    mutationKey: ["sendMessage", currentChatToUser?._id],
    mutationFn: async ({ receiverId, formData }: { receiverId: string; formData: FormData }) =>
      send(receiverId, formData),
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data.message]);
    }
  });

  const subscribeToNewMessages = React.useCallback(() => {
    if (!socket) return;

    socket.on("new_message", (message: TMessage) => {
      const isMessageForCurrentChat = message.sender === currentChatToUser?._id;
      if (isMessageForCurrentChat) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, [socket, currentChatToUser]);

  const unsubscribeFromNewMessages = React.useCallback(() => {
    if (!socket) return;

    socket.off("new_message");
  }, [socket]);

  const { mutate } = useMutation({
    mutationKey: ["getMessages", currentChatToUser?._id],
    mutationFn: async (receiverId: string) => getMessages(receiverId),
    onSuccess: (data) => {
      setMessages(data.messages);
    }
  });

  const { data } = useQuery({ queryKey: ["getUsers"], queryFn: getOnlineUsers, enabled: !!socket && !!onlineUserIds });

  const onlineUsers = data?.users.filter((user) => onlineUserIds.includes(user._id)) || [];
  const offlineUsers = data?.users.filter((user) => !onlineUserIds.includes(user._id)) || [];
  const isUserOnline = onlineUsers.some((user) => user._id === currentChatToUser?._id);

  return (
    <ChatStateContext.Provider
      value={{
        users: { onlineUsers, offlineUsers },
        messages,
        currentChatToUser,
        isUserOnline,
        mobilePage
      }}
    >
      <ChatActionsContext.Provider
        value={{ changeMobilePage, changeUserToChat, sendMessage, subscribeToNewMessages, unsubscribeFromNewMessages }}
      >
        {children}
      </ChatActionsContext.Provider>
    </ChatStateContext.Provider>
  );
};

const useChat = () => {
  const state = React.useContext(ChatStateContext);
  const actions = React.useContext(ChatActionsContext);

  if (!state || !actions) {
    throw new Error("useChat must be used within ChatProvider");
  }

  return { ...state, ...actions };
};

export { ChatProvider, useChat };
