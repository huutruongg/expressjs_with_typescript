import { Router, Request, Response } from "express";
import EmailController from "../controllers/email.controller";
const router = Router();

router.post('/sending', (req: Request, res: Response) => {
    EmailController.sendEmail(req, res);
})

export default router;