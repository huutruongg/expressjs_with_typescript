import { PrismaClient, book } from '@prisma/client'
import { BooksType, BookType } from '../types/Book'
import { v4 as uuidv4 } from 'uuid';
import { AuthUserType, UserType } from '../types/User';

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

    checkPassword: (pwdResquest: string, pwdUser: string): boolean => {
        return pwdResquest === pwdUser ? true : false;
    }
}

export default AuthService;

