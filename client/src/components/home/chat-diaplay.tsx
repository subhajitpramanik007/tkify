import React from "react";
import { useChat } from "@/providers";
import { useSession } from "@/hooks/use-session";
import { cn, formatMessageTime } from "@/lib/utils";

export const ChatDisplay = () => {
  const { messages, subscribeToNewMessages, unsubscribeFromNewMessages } = useChat();
  const {
    session: { user }
  } = useSession();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    subscribeToNewMessages();

    return () => unsubscribeFromNewMessages();
  }, [subscribeToNewMessages, unsubscribeFromNewMessages]);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
      {messages.map((message) => (
        <div key={message._id} className={cn("flex flex-col p-2 rounded-lg")}>
          <div
            className={cn(
              "flex items-center space-x-2 p-2  px-4 rounded-lg w-fit",
              user?._id === message.sender ? "bg-muted ml-auto" : "bg-secondary"
            )}
            ref={messagesEndRef}
          >
            <div className="w-full">
              {message.images && message.images.length > 0 && (
                <img src={message.images[0]} alt="message" className="w-40 aspect-video rounded-lg" />
              )}
              <p className="">{message.text}</p>
              <p className="text-xs">{formatMessageTime(message.createdAt)}</p>
            </div>
          </div>
        </div>
      ))}
      {/* {isTyping && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
        </div>
      )} */}
    </div>
  );
};
