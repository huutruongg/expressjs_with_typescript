import { Router, Request, Response } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get('/users', (req: Request, res: Response) => {
    if (req.query.page || req.query.pageSize) {
        UserController.getUsersByPage(req, res);
    } else {
        UserController.getUsers(req, res);
    }
})

router.get('/users/:id', (req: Request, res: Response) => {
    UserController.getUserById(req, res);
})


router.post('/users', (req: Request, res: Response) => {
    UserController.postUser(req, res);
})

router.put('/books/(:id)', (req: Request, res: Response) => {
    UserController.updateUser(req, res);
})

router.delete('/books/(:id)', (req: Request, res: Response) => {
    UserController.deleteUserById(req, res);
})

export default router;
