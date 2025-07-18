import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "./Model.js";

export interface AuthenticateRequest extends Request {
    user?: IUser | null
}

export const auth = async (req: AuthenticateRequest, res: Response, next: NextFunction):
    Promise<void> => {
    try {

        const token = req.headers.token as string;

        if (!token) {
            res.status(403).json({
                message: "Not logged in"
            });

            return;
        }

        const val = jwt.verify(token, process.env.Jwt as string) as JwtPayload;

        if (!val || !val._id) {
            res.status(403).json({
                message: "Token expired, Please login again"
            });

            return;
        }

        const userId = val._id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            res.status(403).json({
                message: "User not found"
            });

            return;
        }

        req.user = user;
        next();


    } catch (error) {
        res.status(403).json({
            message: "Please log in",
        })
    }
}