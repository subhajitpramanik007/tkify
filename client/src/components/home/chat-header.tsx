import { UserAvatar } from "../avatar";
import { Button } from "../ui/button";
import { useChat } from "@/providers";
import { ArrowLeft, MoreVertical } from "lucide-react";

export const ChatHeader = () => {
  const { currentChatToUser, isUserOnline, changeMobilePage } = useChat();

  return (
    <div className="flex w-full h-16 px-2 border-b justify-between items-center">
      <div className="flex items-center">
        <button onClick={() => changeMobilePage("contacts")} className="mx-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <UserAvatar className="mr-4" user={currentChatToUser} />
        <div>
          <h2 className="font-semibold">{currentChatToUser?.name}</h2>
          <p className="text-xs text-gray-600">{isUserOnline ? "Online" : "Offline"}</p>
        </div>
      </div>
      <Button variant="outline" size="icon" className="rounded-full">
        <MoreVertical />
      </Button>
    </div>
  );
};
