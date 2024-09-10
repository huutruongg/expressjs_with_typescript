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
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRole_1 = __importDefault(require("../types/UserRole"));
const saltRounds = 10;
const prisma = new client_1.PrismaClient();
const UserService = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield prisma.user.findMany();
        console.log(allUsers);
        return allUsers;
    }),
    getUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const User = yield prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return User;
    }),
    postUser: (email, username, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPwd = yield bcrypt_1.default.hashSync(password, saltRounds);
            const id = (0, uuid_1.v4)();
            const role = UserRole_1.default.USER;
            return yield prisma.user.create({
                data: {
                    id,
                    email,
                    username,
                    pwd: hashedPwd, // Store the hashed password
                    role,
                },
            });
        }
        catch (error) {
            throw new Error("Error saving user to database");
        }
    }),
    updateUser: (id, email, username, pwd, role) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPwd = yield bcrypt_1.default.hashSync(pwd, saltRounds);
        yield prisma.user.update({
            where: { id: id },
            data: {
                email,
                username,
                pwd: hashedPwd,
                role
            }
        });
    }),
    updateProfile: (id, email, username, pwd) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPwd = yield bcrypt_1.default.hashSync(pwd, saltRounds);
        yield prisma.user.update({
            where: { id: id },
            data: {
                email,
                username,
                pwd: hashedPwd
            }
        });
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.delete({
            where: {
                id: id
            }
        });
    }),
    getBooksByPage: (page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const Users = yield prisma.user.findMany();
        return Users.slice(startIndex, endIndex);
    })
};
exports.default = UserService;
