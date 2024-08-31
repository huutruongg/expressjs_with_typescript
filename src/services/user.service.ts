import { PrismaClient, user } from '@prisma/client'
import { UsersType, UserType } from '../types/User'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import UserRole from '../types/UserRole';
const saltRounds = 10;
const prisma = new PrismaClient()

const UserService = {
    getAllUsers: async (): Promise<UsersType> => {
        const allUsers: UsersType = await prisma.user.findMany();
        console.log(allUsers);

        return allUsers;
    },

    getUser: async (id: string): Promise<UserType | null> => {
        const User: UserType | null = await prisma.user.findUnique({
            where: {
                id: id
            }
        }
        )
        return User;
    },

    postUser: async (email: string, username: string, password: string): Promise<UserType> => {
        try {
            const hashedPwd = await bcrypt.hashSync(password, saltRounds);

            const id: string = uuidv4();
            const role = UserRole.USER;

            return await prisma.user.create({
                data: {
                    id,
                    email,
                    username,
                    pwd: hashedPwd,  // Store the hashed password
                    role,
                },
            });
        } catch (error) {
            throw new Error("Error saving user to database");
        }
    },

    updateUser: async (id: string, email: string, username: string, pwd: string, role: string): Promise<void> => {
        const hashedPwd = await bcrypt.hashSync(pwd, saltRounds);
        await prisma.user.update({
            where: { id: id },
            data: {
                email,
                username,
                pwd: hashedPwd,
                role
            }
        })
    },

    updateProfile: async (id: string, email: string, username: string, pwd: string): Promise<void> => {
        const hashedPwd = await bcrypt.hashSync(pwd, saltRounds);
        await prisma.user.update({
            where: { id: id },
            data: {
                email,
                username,
                pwd: hashedPwd
            }
        })
    },

    deleteUser: async (id: string): Promise<void> => {
        await prisma.user.delete({
            where: {
                id: id
            }
        })
    },

    getBooksByPage: async (page: number, pageSize: number): Promise<UsersType> => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const Users: UsersType = await prisma.user.findMany();
        return Users.slice(startIndex, endIndex);
    }
}

export default UserService