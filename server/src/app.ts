import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { app } from "./lib/socket.js";

dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGINS === "*" ? "*" : process.env.CORS_ORIGINS?.split(","),
    credentials: true
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the TKIFY app API");
});

// Routes
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);

// Error handling
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { config } from "dotenv";

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
