import { Response, Request, NextFunction } from "express";
import { ApiError } from "../lib/api-error.js";

function errorMiddleware(error: ApiError, req: Request, res: Response, next: NextFunction) {
    try {
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        res.status(status).json({ message, status });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", status: 500 });
    }
}

export { errorMiddleware };
