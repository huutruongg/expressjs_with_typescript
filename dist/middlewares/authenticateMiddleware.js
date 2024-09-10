"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(403).setHeader('Location', 'api/login');
        res.send(`
                    <html>
                    <head>
                        <meta http-equiv="refresh" content="3;url=/login" />
                    </head>
                    <body>
                        <p>Unauthorized: Invalid token. Redirecting to login page in 3 seconds...</p>
                    </body>
                    </html>
                `);
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).setHeader('Location', 'api/login');
                res.send(`
                    <html>
                    <head>
                        <meta http-equiv="refresh" content="3;url=/login" />
                    </head>
                    <body>
                        <p>Unauthorized: Invalid token. Redirecting to login page in 3 seconds...</p>
                    </body>
                    </html>
                `);
                return;
            }
            req.userData = user;
            console.log(req.userData.role);
            next();
        });
    }
    catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
        return;
    }
};
exports.default = authenticate;
