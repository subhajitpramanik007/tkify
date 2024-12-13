import mongoose from "mongoose";

interface IMessage extends mongoose.Document {
  sender: mongoose.Schema.Types.ObjectId;
  receiver: mongoose.Schema.Types.ObjectId;
  text?: string;
  images: string[];
  imagePublicId?: string;
  isRead?: boolean;
  isEdited?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: false },
    images: { type: [String], required: false },
    imagePublicId: { type: String, required: false },
    isRead: { type: Boolean, required: true, default: false },
    isEdited: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
