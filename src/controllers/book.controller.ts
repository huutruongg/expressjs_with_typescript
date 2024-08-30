import { Response, Request } from "express"
import BookService from "../services/book.service"
import { log } from "console";

const BookController = {
    getBooks: async (req: Request, res: Response): Promise<void> => {
        const data = await BookService.getAllBooks();
        if (data != undefined) {
            res.status(200).json(data);
        } else {
            res.status(500).json(
                { "msg": "Have error with your data!" }
            );
        }
    },

    getBookById: async (req: Request, res: Response): Promise<void> => {
        const id: string = req.params.id;
        const data = await BookService.getBook(id);
        if (data != null) {
            res.status(200).json(data);
        } else {
            res.status(500).json(
                { "msg": "Have error with your data!" }
            );
        }
    },

    getBooksByPage: async (req: Request, res: Response): Promise<void> => {
        const currentPage: number = Number(req.query.page) || 1;
        const pageSize: number = Number(req.query.pageSize) || 5;
        log(pageSize, currentPage)
        if (currentPage < 1 || pageSize < 1) {
            res.status(400).json({ error: 'Invalid page or pageSize' });
            return;
        } else {
            const data = await BookService.getBooksByPage(currentPage, pageSize)
            res.status(200).json(data)
        }
    },

    postBook: (req: Request, res: Response): void => {
        const { book_name, author, year_wrote } = req.body;
        log(book_name, author, year_wrote)
        if (book_name != undefined && author != undefined && year_wrote != undefined) {
            BookService.postBook(String(book_name), String(author), Number(year_wrote));
            res.status(200).send(
                { "message": "Create succed!" }
            )
        } else {
            res.status(500).send(
                { "message": "Create failed!" }
            )
        }
    },

    updateBook: (req: Request, res: Response): void => {
        const id: string = req.params.id;
        const { book_name, author, year_wrote } = req.body;
        if (id != undefined) {
            BookService.updateBook(id, book_name, author, year_wrote);
            res.status(200).send({ "message": "Update succed!" })
        } else {
            res.status(500).send({ "message": "Update failed!" })
        }
    },

    deleteBookById: (req: Request, res: Response): void => {
        const id: string = req.params.id;
        log(id)
        if (id != undefined) {
            BookService.deleteBookById(id);
            res.status(200).send({ "message": "Delete succed!" })
        } else {
            res.status(500).send({ "message": "Delete failed!" })
        }
    }
}

export default BookController;

