import { log } from "console";
require('dotenv').config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const mailing = async (from: string, to: string, subject: string, text: string): Promise<boolean> => {
    // log(from, to, subject, text)
    try {
        const info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text
        });
        return info != undefined ? true : false;
    } catch (error) {
        console.error("Error sending mail:", error);
        return false;
    }
}


export default mailing;