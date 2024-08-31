import { AuthUserType } from '../types/User';
import { Response, Request, NextFunction } from "express"
import AuthService from "../services/auth.service";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

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

            // Check password
            if (!AuthService.checkPassword(existingUser.pwd, password)) {
                res.status(401).json({ message: "Invalid credentials!" });
                return;
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    userId: existingUser.id,
                    email: existingUser.email
                },
                process.env.SECRET_KEY as string, 
                { expiresIn: "1h" }
            );

            res.status(200).json({
                success: true,
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                    token: token,
                },
            });

        } catch (err) {
            console.error(err);
            return next(new Error("Error! Something went wrong."));
        }
    },

    signup: (req: Request, res: Response, next: NextFunction): void => {

    }
}


export default AuthController;