// middleware/authorize.ts
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/Custom";
import UserRole from "../types/UserRole";

const authorize = (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (!(req as CustomRequest).userData) {
                res.status(401).json({ message: "Authentication required!" });
                return;
            }

            const userRole: UserRole | undefined = (req as CustomRequest).userData.role;

            if (userRole && allowedRoles.includes(userRole)) {
                next();
            } else {
                res.status(403).json({ message: "You are not allowed to access this resource!" });
            }
        } catch (error) {
            console.error("Error in authorize middleware:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};

export default authorize;
