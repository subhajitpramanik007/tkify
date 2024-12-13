import React from "react";
import { toast } from "sonner";
import { useChat } from "@/providers";

export const useSendMessage = () => {
  const { currentChatToUser, sendMessage } = useChat();

  const [text, setText] = React.useState<string>("");
  const [image, setImage] = React.useState<File>();
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedImages = Array.from(files).filter((file) => file.type.includes("image"));
    setImage(selectedImages[0]);
  };

  const clearImage = () => setImage(undefined);

  const reset = () => {
    setText("");
    setImage(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text && !image) {
      toast("Please enter some text or select an image");
      return;
    }
    if (!currentChatToUser) return;

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (image) formData.append("image", image);

    await sendMessage({ receiverId: currentChatToUser._id, formData });

    reset();
  };

  return { text, image, imageInputRef, handleTextChange, handleSelectImage, reset, clearImage, handleSubmit };
};
