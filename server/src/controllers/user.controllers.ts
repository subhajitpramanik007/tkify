import User from "../models/user.model.js";

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error.js";
import { ApiResponse } from "../lib/api-response.js";
import { cloudinary } from "../lib/cloudinary.js";

const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;

        if ([email, password, name].includes(undefined)) {
            return next(new ApiError("Please provide all the required fields", 400));
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) return next(new ApiError("Email already exists", 400));

        if (password.length < 6)
            return next(new ApiError("Password must be at least 6 characters", 400));

        const user = await User.create({ email, password, name });

        if (!user) {
            return next(new ApiError("User not created", 500));
        }

        const { accessToken, accessExpires } = user.generateAccessToken();
        const { refreshToken, refreshExpires } = user.generateRefreshToken();

        res.cookie("__accees_token", accessToken, { ...cookieOptions, expires: accessExpires })
            .cookie("__refresh_token", refreshToken, { ...cookieOptions, expires: refreshExpires })
            .status(201)
            .json(
                new ApiResponse("User registered successfully", 201, {
                    user: user.toJSON(),
                    accessToken: { token: accessToken, expires: accessExpires }
                })
            );
    } catch (error: any) {
        console.error("Error in User Register :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email) return next(new ApiError("Please provide email", 400));
        if (!password) return next(new ApiError("Please provide password", 400));

        if (password.length < 6)
            return next(new ApiError("Password must be at least 6 characters", 400));

        const user = await User.findOne({ email });

        if (!user) return next(new ApiError("User not found", 404));

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return next(new ApiError("Invalid credentials", 401));

        const { accessToken, accessExpires } = user.generateAccessToken();
        const { refreshToken, refreshExpires } = user.generateRefreshToken();

        res.cookie("__accees_token", accessToken, { ...cookieOptions, expires: accessExpires })
            .cookie("__refresh_token", refreshToken, { ...cookieOptions, expires: refreshExpires })
            .status(200)
            .json(
                new ApiResponse("User logged in successfully", 200, {
                    user: user.toJSON(),
                    accessToken: { token: accessToken, expires: accessExpires }
                })
            );
    } catch (error: any) {
        console.error("Error in User Login :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookieRefreshToken = req.cookies.__refresh_token;

        if (!cookieRefreshToken) return next(new ApiError("No refresh token provided", 400));

        const decoded: any = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET!);

        const user = await User.findById(decoded.id);

        if (!user) return next(new ApiError("User not found", 404));

        const { accessToken, accessExpires } = user.generateAccessToken();
        const { refreshToken, refreshExpires } = user.generateRefreshToken();

        res.cookie("__accees_token", accessToken, { ...cookieOptions, expires: accessExpires })
            .cookie("__refresh_token", refreshToken, { ...cookieOptions, expires: refreshExpires })
            .status(200)
            .json(
                new ApiResponse("Token refreshed successfully", 200, {
                    user: user.toJSON(),
                    accessToken: { token: accessToken, expires: accessExpires }
                })
            );
    } catch (error: any) {
        console.error("Error in Refresh Token :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("__accees_token")
            .clearCookie("__refresh_token")
            .status(200)
            .json(new ApiResponse("User logged out successfully", 200));
    } catch (error: any) {
        console.error("Error in User Logout :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(new ApiResponse("User authenticated", 200));
    } catch (error: any) {
        console.error("Error in Check Auth :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;

        if (!user) return next(new ApiError("User not found", 404));

        res.status(200).json(new ApiResponse("User found", 200, { user: user.toJSON() }));
    } catch (error: any) {
        console.error("Error in Get Me :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;

        if (!user) return next(new ApiError("User not found", 404));

        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) return next(new ApiError("Email already exists", 400));

        user.email = req.body.email || user.email;
        user.name = req.body.name || user.name;

        await user.save();

        res.status(200).json(new ApiResponse("Profile updated", 200, { user: user.toJSON() }));
    } catch (error: any) {
        console.error("Error in Update Profile :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, avatar } = req.body;

        if (!avatar) return next(new ApiError("Please provide an image", 400));

        const avatarUploadResponse = await cloudinary.uploader.upload(avatar, {
            folder: "tkify/avatars",
            width: 150,
            height: 150
        });

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { avatar: avatarUploadResponse.secure_url },
            { new: true }
        );

        if (!updatedUser) return next(new ApiError("User not found", 404));

        res.status(200).json(
            new ApiResponse("Avatar uploaded", 200, { user: updatedUser.toJSON() })
        );
    } catch (error: any) {
        console.error("Error in Avatar Upload :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const deleteMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password } = req.body;

        if (!password) return next(new ApiError("Please provide password", 400));

        const isMatch = await req.body.user.comparePassword(password);
        if (!isMatch) return next(new ApiError("Invalid password", 401));

        await User.findByIdAndDelete(req.body.user._id);

        res.status(200).json(new ApiResponse("User deleted", 200));
    } catch (error: any) {
        console.error("Error in Delete Me :: ", error?.message);
        return next(new ApiError(error?.message));
    }
};

const userCtrls = {
    register,
    login,
    refreshToken,
    logout,
    checkAuth,
    getMe,
    updateMe,
    uploadAvatar,
    deleteMe
};

export default userCtrls;
