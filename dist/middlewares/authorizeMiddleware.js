"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.userData) {
                res.status(401).json({ message: "Authentication required!" });
                return;
            }
            const userRole = req.userData.role;
            if (userRole && allowedRoles.includes(userRole)) {
                next();
            }
            else {
                res.status(403).json({ message: "You are not allowed to access this resource!" });
            }
        }
        catch (error) {
            console.error("Error in authorize middleware:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};
exports.default = authorize;
