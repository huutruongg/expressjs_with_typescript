import { Request } from "express";
import UserRole from "./UserRole";

export type UserType = {
    id: string,
    email: string,
    username: string,
    pwd: string,
    role: string
}

export type UsersType = UserType[]

export type AuthUserType = UserType & {
    token?: string;
};

export type UserDataType = {
    userId: string;
    email: string;
    role: UserRole;
};