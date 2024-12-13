import { TUser } from "@/lib/types";
import { UserAvatar } from "../avatar";
import { useChat } from "@/providers";
import { cn } from "@/lib/utils";

export function Contact({ user, isOnline }: { user: TUser; isOnline?: boolean }) {
  const { currentChatToUser, changeUserToChat } = useChat();

  return (
    <div
      key={user._id}
      className={cn(
        "flex items-center px-4 py-2 hover:bg-primary/10 hover:cursor-pointer shadow-lg",
        currentChatToUser?._id === user._id && "bg-primary/10"
      )}
      onClick={() => changeUserToChat(user._id)}
    >
      <UserAvatar user={{ ...user }} isOnline={isOnline} />
      <div className="flex flex-col w-full ml-3">
        <div className="flex w-full items-center justify-between">
          <h2>{user.name}</h2>
          {/* <span className="text-xs text-muted-foreground ml-2">{user.time}</span> */}
        </div>
        {/* <p className="text-sm text-muted-foreground line-clamp-1">{user.lastMessage}</p> */}
      </div>
    </div>
  );
}
