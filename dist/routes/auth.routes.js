"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post('/signup', (req, res, next) => {
    auth_controller_1.default.signup(req, res, next);
});
router.post('/login', (req, res, next) => {
    auth_controller_1.default.login(req, res, next);
});
exports.default = router;
