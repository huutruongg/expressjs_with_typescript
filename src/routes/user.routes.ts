import { Router, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import authMidldeware from "../middlewares/authMiddleware";

const router = Router();

router.get('/users', authMidldeware, (req: Request, res: Response) => {
    if (req.query.page || req.query.pageSize) {
        UserController.getUsersByPage(req, res);
    } else {
        UserController.getUsers(req, res);
    }
})

router.get('/users/:id', authMidldeware, (req: Request, res: Response) => {
    UserController.getUserById(req, res);
})


router.post('/users', authMidldeware, (req: Request, res: Response) => {
    UserController.postUser(req, res);
})

router.put('/users/(:id)', authMidldeware, (req: Request, res: Response) => {
    UserController.updateUser(req, res);
})

router.delete('/users/(:id)', authMidldeware, (req: Request, res: Response) => {
    UserController.deleteUserById(req, res);
})


export default router;
