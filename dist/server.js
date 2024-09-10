"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const console_1 = require("console");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) | 3030;
app.use(express_1.default.json());
app.use('/api/', auth_routes_1.default);
app.use('/api/', book_routes_1.default);
app.use('/api/', user_routes_1.default);
app.listen(port, () => {
    (0, console_1.log)(`Server listening in http://localhost:${port}`);
});
