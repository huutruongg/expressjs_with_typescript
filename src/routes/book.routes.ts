import { Router, Request, Response } from "express";
import BookController from "../controllers/book.controller";
import authMidldeware from "../middlewares/authMiddleware";

const router = Router();

router.get('/books', authMidldeware, (req: Request, res: Response) => {
    if (req.query.page || req.query.pageSize) {
        BookController.getBooksByPage(req, res);
    } else {
        BookController.getBooks(req, res);
    }
})

router.get('/books/(:id)', authMidldeware, (req: Request, res: Response) => {
    BookController.getBookById(req, res);
})

router.post('/books', authMidldeware, (req: Request, res: Response) => {
    BookController.postBook(req, res);
})

router.put('/books/(:id)', authMidldeware, (req: Request, res: Response) => {
    BookController.updateBook(req, res);
})

router.delete('/books/(:id)', authMidldeware, (req: Request, res: Response) => {
    BookController.deleteBookById(req, res);
})

export default router;