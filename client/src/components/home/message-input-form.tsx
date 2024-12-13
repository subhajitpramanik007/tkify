import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useChat, useSocket } from "@/providers";
import { useSendMessage } from "@/hooks/use-send-message";
import { Paperclip, SendHorizonalIcon, X } from "lucide-react";
import { Show } from "../show";

const MessageInputForm = () => {
  const { socket } = useSocket();
  const { currentChatToUser } = useChat();
  const { text, handleTextChange, handleSubmit, image, imageInputRef, clearImage, handleSelectImage } =
    useSendMessage();

  const inputRef = React.useRef<HTMLInputElement>(null);

  // typing indicator
  React.useEffect(() => {
    if (!socket || !inputRef.current) return;

    inputRef.current.focus();

    const handleTyping = () => {
      socket.emit("typing", { typing: !!text.length, receiverId: currentChatToUser?._id });
    };

    inputRef.current.addEventListener("input", handleTyping);

    return () => {
      socket.off("typing");
    };
  }, [socket, text.length, currentChatToUser?._id]);

  return (
    <div className="flex w-full items-center bg-transparent border-t h-16 px-4 backdrop-blur-xl space-x-3 mb-12 md:mb-0 relative">
      <Show when={!!image} className="absolute bottom-16 z-10">
        <div className="flex items-center space-x-2">
          <div className="flex rounded-lg w-1/3 items-start">
            <img
              src={image && URL.createObjectURL(image)}
              alt="image"
              className="w-full aspect-video rounded-lg border-2"
            />
            <button onClick={clearImage} className="z-20 border p-[2px] rounded-md">
              <X size={16} />
            </button>
          </div>
        </div>
      </Show>
      <form className="flex w-full items-center space-x-3" onSubmit={handleSubmit}>
        <div className="relative w-full flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 rounded-full"
            type="button"
            onClick={() => imageInputRef.current?.click()}
          >
            <Paperclip />
          </Button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            max={1}
            className="hidden"
            onChange={handleSelectImage}
          />
          <Input
            type="text"
            placeholder="Type a message..."
            className="flex-1 pr-12 pl-4 h-12 outline-none rounded-full"
            value={text}
            onChange={handleTextChange}
            ref={inputRef}
          />
        </div>
        <Button className="rounded-2xl" type="submit">
          <SendHorizonalIcon size={20} />
        </Button>
      </form>
    </div>
  );
};

export { MessageInputForm };
