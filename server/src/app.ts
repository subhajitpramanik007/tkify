import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

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

// Error handling
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
