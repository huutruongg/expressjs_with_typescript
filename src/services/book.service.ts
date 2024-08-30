// import { BookType } from './../types/Book.type';
// import fs from 'fs'
// import path from "path"
// import { log } from "console"
// import Books from "../database/Book.json"
// import { BooksType, BookType } from "../types/Book.type"

// const filePath = path.join(__dirname, '../database/Book.json');

// const saveDataToFile = (books: BooksType) => {
//     fs.writeFileSync(filePath, JSON.stringify(books, null, 4), 'utf-8')
// }

// const BookService = {
//     getAllBooks: (): BooksType => {
//         return Books as BooksType
//     },

//     getBookById: (id: number): BookType | undefined => {
//         const data = Books.find((item: BookType) => item.id === id)
//         log(id, data)
//         return data as BookType
//     },

//     postBook: (id: number, name: string, author: string, year: number): void => {
//         const newBook: BookType = { id, name, author, year };
//         (Books as BooksType).push(newBook)
//         saveDataToFile(Books as BooksType)
//     },

//     updateBook: (id: number, name: string, author: string, year: number): void => {
//         const books = Books as BooksType;
//         const index = books.findIndex((item: BookType) => item.id === id);
//         if (index !== -1) {
//             books[index] = { id, name, author, year };
//             saveDataToFile(books);
//         }
//     },

//     deleteBookById: (id: number): void => {
//         const books = Books as BooksType;
//         const index = books.findIndex((item: BookType) => item.id === id);
//         if (index !== -1) {
//             books.splice(index, 1);
//             saveDataToFile(books);
//         }
//     },

//     getBooksByPage: (page: number, pageSize: number): BooksType => {
//         const startIndex = (page - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         return (Books as BooksType).slice(startIndex, endIndex);
//     }
// }

// export default BookService

import { PrismaClient, book } from '@prisma/client'
import { BooksType, BookType } from '../types/Book.type'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

const BookService = {
    getAllBooks: async (): Promise<BooksType> => {
        const allBooks : BooksType = await prisma.book.findMany();
        console.log(allBooks);
        return allBooks;
    },

    getBook: async (id: string): Promise<BookType | null> => {
        const Book: BookType | null = await prisma.book.findUnique({
            where: {
                id: id
            }
        }
        )
        return Book;
    },

    postBook: async (book_name: string, author: string, year_wrote: number): Promise<void> => {
        const id: string = uuidv4();
        await prisma.book.create({
            data: {
                id,
                book_name,
                author,
                year_wrote
            },
        });
    },

    updateBook: async (id: string, book_name: string, author: string, year_wrote: number): Promise<void> => {
        await prisma.book.update({
            where: { id: id },
            data: {
                book_name,
                author,
                year_wrote
            }
        })
    },

    deleteBookById: async (id: string): Promise<void> => {
        await prisma.book.delete({
            where: {
                id: id
            }
        })
    },

    getBooksByPage: async (page: number, pageSize: number): Promise<BooksType> => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const Books: BooksType = await prisma.book.findMany();
        return Books.slice(startIndex, endIndex);
    }
}

export default BookService

