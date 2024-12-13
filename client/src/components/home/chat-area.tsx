import { ChatHeader } from "./chat-header";
import { ChatDisplay } from "./chat-diaplay";
import { MessageInputForm } from "./message-input-form";

export function ChatArea() {
  return (
    <div className="flex flex-col flex-1">
      <ChatHeader />
      <ChatDisplay />
      <MessageInputForm />
    </div>
  );
}
