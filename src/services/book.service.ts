import fs from 'fs'
import path from "path"
import { log } from "console"
import Books from "../database/Book.json"
import { BooksType, BookType } from "../types/Book.type"

const filePath = path.join(__dirname, '../database/Book.json');

const saveDataToFile = (books: BooksType) => {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 4), 'utf-8')
}

const BookService = {
    getAllBooks: (): BooksType => {
        return Books as BooksType
    },

    getBookById: (id: number): BookType | undefined => {
        const data = Books.find((item: BookType) => item.id === id)
        log(id, data)
        return data as BookType
    },

    postBook: (id: number, name: string, author: string, year: number): void => {
        const newBook: BookType = { id, name, author, year };
        (Books as BooksType).push(newBook)
        saveDataToFile(Books as BooksType)
    },

    updateBook: (id: number, name: string, author: string, year: number): void => {
        const books = Books as BooksType;
        const index = books.findIndex((item: BookType) => item.id === id);
        if (index !== -1) {
            books[index] = { id, name, author, year };
            saveDataToFile(books);
        }
    },

    deleteBookById: (id: number): void => {
        const books = Books as BooksType;
        const index = books.findIndex((item: BookType) => item.id === id);
        if (index !== -1) {
            books.splice(index, 1);
            saveDataToFile(books);
        }
    },

    getBooksByPage: (page: number, pageSize: number): BooksType => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return (Books as BooksType).slice(startIndex, endIndex);
    }
}

export default BookService

