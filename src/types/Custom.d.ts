import { Request } from "express"

interface CustomRequest extends Request {
    userData: UserDataType;
}