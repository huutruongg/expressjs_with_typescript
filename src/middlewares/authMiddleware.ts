import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { UserDataType } from "../types/User";
import { CustomRequest } from "../types/Custom";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Authentication failed!" });
        return; 
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
        (req as CustomRequest).userData = decodedToken as UserDataType;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
        return;
    }
}

export default authMiddleware;
