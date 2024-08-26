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


// router.post('/users', (req: Request, res: Response) => {
//     // UserController.po
// })

export default router;
