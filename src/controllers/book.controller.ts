import { Response, Request } from "express"
import BookService from "../services/book.service"
import { log } from "console";

const BookController = {
    getBooks: (req: Request, res: Response): void => {
        const data = BookService.getAllBooks();
        res.status(200).json(data);
    },

    getBookById(req: Request, res: Response): void {
        const id: number = Number(req.params.id);
        log("----------- Id:", id)
        const data = BookService.getBookById(id);
        log(data)
        res.status(200).json(data);
    },

    postBook: (req: Request, res: Response): void => {
        const { id, name, author, year } = req.body;
        log(id, name, author, year)
        if (id != undefined && name != undefined && author != undefined && year != undefined) {
            BookService.postBook(Number(id), String(name), String(author), Number(year));
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
        const id: number = Number(req.params.id);
        const { name, author, year } = req.body;
        if (id != undefined) {
            BookService.updateBook(id, name, author, year);
            res.status(200).send({ "message": "Update succed!" })
        } else {
            res.status(500).send({ "message": "Update failed!" })
        }
    },

    deleteBookById: (req: Request, res: Response): void => {
        const id: number = Number(req.params.id);
        log(id)
        if (id != undefined) {
            BookService.deleteBookById(id);
            res.status(200).send({ "message": "Delete succed!" })
        } else {
            res.status(500).send({ "message": "Delete failed!" })
        }
    },

    getBooksByPage: (req: Request, res: Response): void => {
        const currentPage: number = Number(req.query.page) || 1;
        const pageSize: number = Number(req.query.pageSize) || 5;
        log(pageSize, currentPage)
        if (currentPage < 1 || pageSize < 1) {
            res.status(400).json({ error: 'Invalid page or pageSize' });
            return;
        } else {
            const data = BookService.getBooksByPage(currentPage, pageSize)
            res.status(200).json(data)
        }
    }
}

export default BookController;

