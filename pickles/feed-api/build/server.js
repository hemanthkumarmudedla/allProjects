"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const feedRouter_1 = __importDefault(require("./feed/feedRouter"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.defineMiddleware();
    }
    defineMiddleware() {
        this.app.use(body_parser_1.default.json());
        this.mountRoutes();
        this.run();
    }
    mountRoutes() {
        this.app.use('/', feedRouter_1.default);
    }
    run() {
        this.app.listen(3000, 'localhost', () => {
            return console.log(`Server is listening on http://localhost:3000`);
        });
    }
}
exports.default = new Server().app;
