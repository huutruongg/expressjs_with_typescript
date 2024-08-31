import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'
import { AuthUserType } from '../types/User';

const prisma = new PrismaClient()

const AuthService = {
    getUserByEmail: async (email: string): Promise<AuthUserType | null> => {
        const user: AuthUserType | null = await prisma.user.findUnique(
            {
                where: {
                    email: email
                }
            }
        );
        console.log(user);
        return user;

    },

    checkPassword: async (pwdRequest: string, hashedPwd: string): Promise<boolean> => {
        try {
            return await bcrypt.compare(pwdRequest, hashedPwd);
        } catch (error) {
            return false;
        }
    },

    generateToken: (userId: string, email: string, role: string) => {
        const payload = { userId, role };
        return jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '1h' });
    }
}

export default AuthService;

