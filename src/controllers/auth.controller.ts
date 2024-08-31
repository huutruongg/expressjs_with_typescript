import { AuthUserType } from '../types/User';
import { Response, Request, NextFunction } from "express"
import AuthService from "../services/auth.service";
import dotenv from 'dotenv';
import UserService from '../services/user.service';
import { log } from 'console';
import UserRole from '../types/UserRole';

dotenv.config();


const AuthController = {
    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password } = req.body;

        try {
            // Await the result of the promise
            const existingUser: AuthUserType | null = await AuthService.getUserByEmail(email);

            // Check if the user exists
            if (!existingUser) {
                res.status(401).json({ message: "User not found!" });
                return;
            }

            const isValidPasswod = await AuthService.checkPassword(password, existingUser.pwd);
            log("Check role: ", existingUser.role)
            // Check password
            if (!isValidPasswod) {
                res.status(401).json({ message: "Invalid credentials!" });
                return;
            } else {
                // Generate JWT token
                const token = AuthService.generateToken(existingUser.id as string, existingUser.email, existingUser.role);

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

        } catch (err) {
            console.error(err);
            return next(new Error("Error! Something went wrong."));
        }
    },

    signup: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, username, password } = req.body;
        try {
            // Check if the user exists
            const existingUser: AuthUserType | null = await AuthService.getUserByEmail(email);
            if (existingUser) {
                res.status(401).json({ message: "This email has existing! Please entered other email." });
                return;
            }
            const newUser = await UserService.postUser(email, username, password);
            // Generate JWT token
            const token = AuthService.generateToken(newUser.id, newUser.email, newUser.role as UserRole)
            // Send response
            res.status(200).json({
                success: true,
                data: {
                    userId: newUser.id,
                    email: newUser.email,
                    token: token
                },
            });

        } catch (err) {
            console.error(err);
            return next(new Error("Error! Something went wrong."));
        }
    }
}

export default AuthController;