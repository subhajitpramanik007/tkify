import { useChat } from "@/providers";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { ChatArea, ConversationBar } from "@/components/home";

export const Chat = () => {
  const { mobilePage, currentChatToUser } = useChat();
  const isMobile = useIsMobile();

  return (
    <>
      {(!isMobile || mobilePage === "contacts") && <ConversationBar />}
      {currentChatToUser && mobilePage === "chat" && <ChatArea />}
    </>
  );
};
