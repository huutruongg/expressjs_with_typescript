import { Request, Response } from "express";
import UserService from "../services/user.service";
import { log } from "console";
import { CustomRequest } from "../types/Custom";


const UserController = {
    getUsers: async (req: Request, res: Response): Promise<void> => {
        const data = await UserService.getAllUsers();
        if (data != undefined) {
            res.status(200).json(data);
        } else {
            res.status(500).json(
                { "msg": "Have error with your data!" }
            );
        }
    },

    getUserById: async (req: Request, res: Response): Promise<void> => {
        const id: string = req.params.id;
        const data = await UserService.getUser(id);
        if (data != null) {
            res.status(200).json(data);
        } else {
            res.status(500).json(
                { "msg": "Have error with your data!" }
            );
        }
    },

    postUser: (req: Request, res: Response): void => {
        const { email, username, pwd } = req.body;
        log(email, username, pwd)
        if (email != undefined && username != undefined && pwd != undefined) {
            UserService.postUser(email, username, pwd);
            res.status(200).send(
                { "message": "Create succed!" }
            )
        } else {
            res.status(500).send(
                { "message": "Create failed!" }
            )
        }
    },

    updateUser: (req: Request, res: Response): void => {
        const id: string = req.params.id;
        const { email, username, pwd, role } = req.body;
        log(email, username, pwd, role)
        if (id != undefined) {
            UserService.updateUser(id, email, username, pwd, role);
            res.status(200).send({ "message": "Update succed!" })
        } else {
            res.status(500).send({ "message": "Update failed!" })
        }
    },

    updateProfile: async (req: Request, res: Response): Promise<void> => {
        const loggedInUserId: string |undefined = (req as CustomRequest).userData.userId;

        // Unallow to update the other profile
        if (req.params.id && req.params.id !== loggedInUserId) {
            res.status(403).json({ message: "Forbidden: You are not allowed to update this profile!" });
            return;
        }

        // Unallow to update the role
        if (req.body.role !== undefined) {
            res.status(403).json({ message: "Forbidden: You are not allowed to update role!" });
        }

        const { email, username, pwd } = req.body;

        try {
            await UserService.updateProfile(String(loggedInUserId), email, username, pwd);
            res.status(200).json({ message: "Update profile successful!" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Update profile failed!" });
        }
    },

    deleteUserById: (req: Request, res: Response): void => {
        const id: string = req.params.id;
        log(id)
        if (id != undefined) {
            UserService.deleteUser(id);
            res.status(200).send({ "message": "Delete succed!" })
        } else {
            res.status(500).send({ "message": "Delete failed!" })
        }
    },

    getUsersByPage: async (req: Request, res: Response): Promise<void> => {
        const currentPage: number = Number(req.query.page) || 1;
        const pageSize: number = Number(req.query.pageSize) || 5;
        log(pageSize, currentPage)
        if (currentPage < 1 || pageSize < 1) {
            res.status(400).json({ error: 'Invalid page or pageSize' });
            return;
        } else {
            const data = await UserService.getBooksByPage(currentPage, pageSize)
            res.status(200).json(data)
        }
    }
}

export default UserController;