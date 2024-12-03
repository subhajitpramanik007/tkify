import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ms from "ms";

interface IUser extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    avatar: string;
    comparePassword: (password: string) => Promise<boolean>;
    generateAccessToken: () => { accessToken: string; accessExpires: Date };
    generateRefreshToken: () => { refreshToken: string; refreshExpires: Date };
}

const userSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        avatar: { type: String, required: false }
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    const accessToken = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    });

    const accessExpires = new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRES!));
    return { accessToken, accessExpires };
};

userSchema.methods.generateRefreshToken = function () {
    const refreshToken = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    });

    const refreshExpires = new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES!));
    return { refreshToken, refreshExpires };
};

userSchema.set("toJSON", {
    transform: (doc, { __v, password, ...rest }, options) => rest
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
