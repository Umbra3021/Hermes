import { NextFunction, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}

interface AuthenticateRequest extends Request {
    user?: IUser | null;
}

export const Auth = async (req: AuthenticateRequest, res: Response, next: NextFunction,):
    Promise<void> => {
    try {
        const token = req.headers.token as string;

        if (!token) {
            res.status(403).json({ message: "Please log in" });
            return;
        }

        const { data } = await axios.get(`${process.env.User_URL}/api/v1/user/profile`, {
            headers: {
                token,

            },
        });

        req.user = data;
        next();

    } catch (error) {
        res.status(403).json({ message: "Please log in" });
    }
};

const storage = multer.memoryStorage();

const uploadFile = multer({ storage }).single("file");

export default uploadFile;



