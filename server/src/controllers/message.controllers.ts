import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import fs from "fs";
import { Request, Response } from "express";
import { ApiResponse } from "../lib/api-response.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { cloudinary } from "../lib/cloudinary.js";

export const getOnlineUsers = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.body.user._id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");

    res.status(200).json(new ApiResponse("success", 200, { users }));
  } catch (error: any) {
    console.error("Error in getOnlineUsers", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.body.user._id;
    const receiverId = req.params.receiverId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: receiverId },
        { sender: receiverId, receiver: currentUserId }
      ]
    });

    res.status(200).json(new ApiResponse("success", 200, { messages }));
  } catch (error: any) {
    console.error("Error in getMessages", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const { receiverId } = req.params;
    const senderId = req.body.user._id;

    const images = (req.files as { [fieldname: string]: Express.Multer.File[] }).image || [];
    const imagesLocalPath = images.map((image) => image.path || "");

    if (!text && imagesLocalPath.length === 0) {
      res.status(400).json({ message: "Please provide text or image" });
      return;
    }

    const imagesCloudPath = await Promise.all(
      imagesLocalPath.map(async (imagePath) => {
        const imageUploadResponse = await cloudinary.uploader.upload(imagePath, {
          folder: "tkify/messages"
        });
        fs.unlinkSync(imagePath);
        return imageUploadResponse.secure_url;
      })
    );

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      images: imagesCloudPath
    });

    await message.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("receiverSocketId", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", message);
    }

    res.status(200).json(new ApiResponse("success", 200, { message }));
  } catch (error: any) {
    console.error("Error in sendMessage", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
