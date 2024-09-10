"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const console_1 = require("console");
const UserController = {
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_service_1.default.getAllUsers();
        if (data != undefined) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ "msg": "Have error with your data!" });
        }
    }),
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield user_service_1.default.getUser(id);
        if (data != null) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ "msg": "Have error with your data!" });
        }
    }),
    postUser: (req, res) => {
        const { email, username, pwd } = req.body;
        (0, console_1.log)(email, username, pwd);
        if (email != undefined && username != undefined && pwd != undefined) {
            user_service_1.default.postUser(email, username, pwd);
            res.status(200).send({ "message": "Create succed!" });
        }
        else {
            res.status(500).send({ "message": "Create failed!" });
        }
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const { email, username, pwd, role } = req.body;
        (0, console_1.log)(email, username, pwd, role);
        if (id != undefined) {
            user_service_1.default.updateUser(id, email, username, pwd, role);
            res.status(200).send({ "message": "Update succed!" });
        }
        else {
            res.status(500).send({ "message": "Update failed!" });
        }
    },
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const loggedInUserId = req.userData.userId;
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
            yield user_service_1.default.updateProfile(String(loggedInUserId), email, username, pwd);
            res.status(200).json({ message: "Update profile successful!" });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Update profile failed!" });
        }
    }),
    deleteUserById: (req, res) => {
        const id = req.params.id;
        (0, console_1.log)(id);
        if (id != undefined) {
            user_service_1.default.deleteUser(id);
            res.status(200).send({ "message": "Delete succed!" });
        }
        else {
            res.status(500).send({ "message": "Delete failed!" });
        }
    },
    getUsersByPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const currentPage = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 5;
        (0, console_1.log)(pageSize, currentPage);
        if (currentPage < 1 || pageSize < 1) {
            res.status(400).json({ error: 'Invalid page or pageSize' });
            return;
        }
        else {
            const data = yield user_service_1.default.getBooksByPage(currentPage, pageSize);
            res.status(200).json(data);
        }
    })
};
exports.default = UserController;
