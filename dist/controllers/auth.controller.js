"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = __importDefault(require("../services/user.service"));
const console_1 = require("console");
dotenv_1.default.config();
const AuthController = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Await the result of the promise
            const existingUser = yield auth_service_1.default.getUserByEmail(email);
            // Check if the user exists
            if (!existingUser) {
                res.status(401).json({ message: "User not found!" });
                return;
            }
            const isValidPasswod = yield auth_service_1.default.checkPassword(password, existingUser.pwd);
            (0, console_1.log)("Check role: ", existingUser.role);
            // Check password
            if (!isValidPasswod) {
                res.status(401).json({ message: "Invalid credentials!" });
                return;
            }
            else {
                // Generate JWT token
                const token = auth_service_1.default.generateToken(existingUser.id, existingUser.email, existingUser.role);
                res.status(200).json({
                    success: true,
                    data: {
                        userId: existingUser.id,
                        email: existingUser.email,
                        role: existingUser.role,
                        token: token,
                    },
                });
            }
        }
        catch (err) {
            console.error(err);
            return next(new Error("Error! Something went wrong."));
        }
    }),
    signup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        try {
            // Check if the user exists
            const existingUser = yield auth_service_1.default.getUserByEmail(email);
            if (existingUser) {
                res.status(401).json({ message: "This email has existing! Please entered other email." });
                return;
            }
            const newUser = yield user_service_1.default.postUser(email, username, password);
            // Generate JWT token
            const token = auth_service_1.default.generateToken(newUser.id, newUser.email, newUser.role);
            // Send response
            res.status(200).json({
                success: true,
                data: {
                    userId: newUser.id,
                    email: newUser.email,
                    token: token
                },
            });
        }
        catch (err) {
            console.error(err);
            return next(new Error("Error! Something went wrong."));
        }
    })
};
exports.default = AuthController;
