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
const book_service_1 = __importDefault(require("../services/book.service"));
const console_1 = require("console");
const BookController = {
    getBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield book_service_1.default.getAllBooks();
        if (data != undefined) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ "msg": "Have error with your data!" });
        }
    }),
    getBookById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield book_service_1.default.getBook(id);
        if (data != null) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ "msg": "Have error with your data!" });
        }
    }),
    getBooksByPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const currentPage = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 5;
        (0, console_1.log)(pageSize, currentPage);
        if (currentPage < 1 || pageSize < 1) {
            res.status(400).json({ error: 'Invalid page or pageSize' });
            return;
        }
        else {
            const data = yield book_service_1.default.getBooksByPage(currentPage, pageSize);
            res.status(200).json(data);
        }
    }),
    postBook: (req, res) => {
        const { book_name, author, year_wrote } = req.body;
        (0, console_1.log)(book_name, author, year_wrote);
        if (book_name != undefined && author != undefined && year_wrote != undefined) {
            book_service_1.default.postBook(String(book_name), String(author), Number(year_wrote));
            res.status(200).send({ "message": "Create succed!" });
        }
        else {
            res.status(500).send({ "message": "Create failed!" });
        }
    },
    updateBook: (req, res) => {
        const id = req.params.id;
        const { book_name, author, year_wrote } = req.body;
        if (id != undefined) {
            book_service_1.default.updateBook(id, book_name, author, year_wrote);
            res.status(200).send({ "message": "Update succed!" });
        }
        else {
            res.status(500).send({ "message": "Update failed!" });
        }
    },
    deleteBookById: (req, res) => {
        const id = req.params.id;
        (0, console_1.log)(id);
        if (id != undefined) {
            book_service_1.default.deleteBookById(id);
            res.status(200).send({ "message": "Delete succed!" });
        }
        else {
            res.status(500).send({ "message": "Delete failed!" });
        }
    }
};
exports.default = BookController;
