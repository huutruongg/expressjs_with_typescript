"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authenticateMiddleware_1 = __importDefault(require("../middlewares/authenticateMiddleware"));
const authorizeMiddleware_1 = __importDefault(require("../middlewares/authorizeMiddleware"));
const UserRole_1 = __importDefault(require("../types/UserRole"));
const console_1 = require("console");
const router = (0, express_1.Router)();
router.get('/users', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.ADMIN), (req, res) => {
    if (req.query.page || req.query.pageSize) {
        user_controller_1.default.getUsersByPage(req, res);
    }
    else {
        user_controller_1.default.getUsers(req, res);
    }
});
router.get('/users/:id', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.ADMIN), (req, res) => {
    user_controller_1.default.getUserById(req, res);
});
router.post('/users', (req, res) => {
    user_controller_1.default.postUser(req, res);
});
router.put('/admin/update_info/(:id)', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.ADMIN), (req, res) => {
    user_controller_1.default.updateUser(req, res);
});
router.put('/user/update_profile/(:id)', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.USER), (req, res) => {
    user_controller_1.default.updateProfile(req, res);
});
router.delete('/users/(:id)', authenticateMiddleware_1.default, (0, authorizeMiddleware_1.default)(UserRole_1.default.ADMIN), (req, res) => {
    user_controller_1.default.deleteUserById(req, res);
});
router.get('/old-url', (req, res) => {
    setTimeout(() => {
        (0, console_1.log)("HAHA");
        res.redirect('/api/new-url');
    }, 3000);
});
router.get('/new-url', (req, res) => {
    res.json("Success!");
});
exports.default = router;
