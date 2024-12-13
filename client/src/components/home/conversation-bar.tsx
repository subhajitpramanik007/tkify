import { Contact } from "./contact";
import { Input } from "@/components/ui/input";
import { useChat } from "@/providers/ChatProvider";

export function ConversationBar() {
  const {
    users: { offlineUsers, onlineUsers }
  } = useChat();

  return (
    <div className="border-r h-full w-full md:max-w-xs">
      <div className="flex h-16 items-center justify-between px-2 bg-transparent backdrop-blur-xl border-b">
        <h1 className="text-xl">Chat</h1>
      </div>
      <div className="flex h-16 items-center justify-between p-3 bg-transparent backdrop-blur-xl">
        <Input placeholder="Search" className="rounded-full" />
      </div>
      <div className="overflow-y-scroll h-[calc(100%-8rem)] border-t no-scrollbar">
        <div className="p-2">
          <h1 className="text-sm text-muted-foreground">Online</h1>
          {onlineUsers?.map((user) => <Contact key={user._id} user={user} isOnline />)}
        </div>
        <div className="p-2">
          <h1 className="text-sm text-muted-foreground">Offline</h1>
          {offlineUsers?.map((user) => <Contact key={user._id} user={user} />)}
        </div>
      </div>
    </div>
  );
}
