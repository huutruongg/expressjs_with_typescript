// types/Custom.ts
import { Request } from "express";
import UserRole from "./UserRole";

export interface CustomRequest extends Request {
    userData: {
        userId: string;
        email: string
        role: UserRole;
    };
}