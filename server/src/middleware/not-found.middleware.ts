import { Response, Request, NextFunction } from "express";
import { ApiError } from "../lib/api-error.js";

function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    const error = new ApiError("Not Found", 404);
    return next(error);
}

export { notFoundMiddleware };
