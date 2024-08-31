import { Request, Response } from "express";
import UserService from "../services/user.service";
import { log } from "console";


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
        const { email, username, pwd, role } = req.body;
        log(email, username, pwd, role)
        if (email != undefined && username != undefined && pwd != undefined && role != undefined) {
            UserService.postUser(email, username, pwd, role);
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