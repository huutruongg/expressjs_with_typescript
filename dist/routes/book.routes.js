"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const authenticateMiddleware_1 = __importDefault(require("../middlewares/authenticateMiddleware"));
const authorizeMiddleware_1 = __importDefault(require("../middlewares/authorizeMiddleware"));
const UserRole_1 = __importDefault(require("../types/UserRole"));
const router = (0, express_1.Router)();
router.get('/books', (req, res) => {
    if (req.query.page || req.query.pageSize) {
        book_controller_1.default.getBooksByPage(req, res);
    }
    else {
        book_controller_1.default.getBooks(req, res);
    }
});
router.get('/books/(:id)', (req, res) => {
    book_controller_1.default.getBookById(req, res);
});
router.post('/books', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.ADMIN, UserRole_1.default.USER), (req, res) => {
    book_controller_1.default.postBook(req, res);
});
router.put('/books/(:id)', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.ADMIN, UserRole_1.default.USER), (req, res) => {
    book_controller_1.default.updateBook(req, res);
});
router.delete('/books/(:id)', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.ADMIN), (req, res) => {
    book_controller_1.default.deleteBookById(req, res);
});
exports.default = router;
