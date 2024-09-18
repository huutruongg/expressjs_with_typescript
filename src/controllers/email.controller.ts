import { Response, Request, NextFunction } from "express"
import mailing from "../services/email.service";

const EmailController = {
    sendEmail: async (req: Request, res: Response): Promise<void> => {
        const { from, to, subject, text } = req.body;
        const sent: boolean = await mailing(from, to, subject, text)
        if (sent) {
            res.status(200).json({ message: "Sent successfully!" })
        } else {
            res.status(400).json({ message: "Sent failurely!" })
        }
    }
}

export default EmailController;