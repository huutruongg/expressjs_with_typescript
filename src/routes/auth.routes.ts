import { Router, Request, Response, NextFunction } from "express"
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    AuthController.signup(req, res, next);
})

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    AuthController.login(req, res, next);
})

export default router;