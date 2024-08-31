import { PrismaClient, book } from '@prisma/client'
import { BooksType, BookType } from '../types/Book'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

const BookService = {
    getAllBooks: async (): Promise<BooksType> => {
        const allBooks: BooksType = await prisma.book.findMany();
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

