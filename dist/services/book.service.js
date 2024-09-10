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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const BookService = {
    getAllBooks: () => __awaiter(void 0, void 0, void 0, function* () {
        const allBooks = yield prisma.book.findMany();
        console.log(allBooks);
        return allBooks;
    }),
    getBook: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const Book = yield prisma.book.findUnique({
            where: {
                id: id
            }
        });
        return Book;
    }),
    postBook: (book_name, author, year_wrote) => __awaiter(void 0, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        yield prisma.book.create({
            data: {
                id,
                book_name,
                author,
                year_wrote
            },
        });
    }),
    updateBook: (id, book_name, author, year_wrote) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.book.update({
            where: { id: id },
            data: {
                book_name,
                author,
                year_wrote
            }
        });
    }),
    deleteBookById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.book.delete({
            where: {
                id: id
            }
        });
    }),
    getBooksByPage: (page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const Books = yield prisma.book.findMany();
        return Books.slice(startIndex, endIndex);
    })
};
exports.default = BookService;
