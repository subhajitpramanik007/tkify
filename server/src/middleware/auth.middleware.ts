import User from "../models/user.model.js";

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/api-error.js";

import jwt from "jsonwebtoken";

const verifyJwtToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token =
            req.cookies?.__access_token ||
            (req.header("Authorization")?.startsWith("Bearer ")
                ? req.header("Authorization")?.replace("Bearer ", "")
                : null);

        if (!token) return next(new ApiError("You are not authorized", 401));

        const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(payload.id);

        if (!user) return next(new ApiError("User not found", 404));

        req.body.user = user;
        next();
    } catch (error: any) {
        console.error("Error in Verify Token :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

export { verifyJwtToken };
