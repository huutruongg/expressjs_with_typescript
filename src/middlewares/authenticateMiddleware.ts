import { UserDataType } from './../types/User';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { CustomRequest } from "../types/Custom";
dotenv.config();

const authenticate = (req: Request, res: Response, next: NextFunction): void => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Authentication failed!" });
        return;
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Unauthorized: Invalid token' });
            }

            (req as CustomRequest).userData = user as UserDataType;
            console.log((req as CustomRequest).userData.role)
            next();
        })
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
        return;
    }
}

export default authenticate;
