import { PrismaClient, user } from '@prisma/client'
import { UsersType, UserType } from '../types/User'
import { v4 as uuidv4 } from 'uuid';

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

    postUser: async (email: string, username: string, pwd: string, role: string): Promise<void> => {
        const id: string = uuidv4();
        await prisma.user.create({
            data: {
                id,
                email,
                username,
                pwd,
                role,
            },
        });
    },

    updateUser: async (id: string, email: string, username: string, pwd: string, role: string): Promise<void> => {
        await prisma.user.update({
            where: { id: id },
            data: {
                email,
                username,
                pwd,
                role
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