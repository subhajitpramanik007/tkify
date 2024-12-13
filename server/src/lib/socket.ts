import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.CORS_ORIGINS === "*" ? "*" : process.env.CORS_ORIGINS?.split(","),
  credentials: true
};

const io = new Server(server, { cors: corsOptions });

export function getReceiverSocketId(userId: string) {
  return userSocketMap.get(userId);
}

const userSocketMap = new Map<string, string>();

io.on("connection", (socket) => {
  //   console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap.set(userId, socket.id);

  io.emit("get_online_users", Array.from(userSocketMap.keys()));
  //   console.log("online users", Array.from(userSocketMap.keys()));

  // get typing event
  socket.on("typing", ({ typing, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    // console.log("typing", typing, receiverId, receiverSocketId);
    if (!receiverSocketId) return;

    // send typing event to receiver
    socket.to(receiverSocketId).emit("typing", typing);
  });

  socket.on("disconnect", () => {
    // console.log("a user disconnected", socket.id);
    userSocketMap.forEach((value, key) => {
      if (value === socket.id) {
        userSocketMap.delete(key);
      }
    });
    io.emit("get_online_users", Array.from(userSocketMap.keys()));
  });
});

export { server, io, app };
