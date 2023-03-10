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
const express_1 = __importDefault(require("express"));
const feedRepository_1 = __importDefault(require("./feedRepository"));
class FeedRouter {
    constructor() {
        this.feedRouter = express_1.default.Router();
        this.defineRouter();
    }
    defineRouter() {
        this.feedRouter.all('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            next();
        }));
        this.feedRouter.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield feedRepository_1.default.createEntity(req.body);
            res.status(200).json(result);
            res.end();
        }));
        this.feedRouter.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield feedRepository_1.default.getEntity(req.body.pk, req.body.rk);
            res.status(200).json(result);
            res.end();
        }));
        this.feedRouter.put('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield feedRepository_1.default.createEntity(req.body);
            res.status(200).json(result);
            res.end();
        }));
        this.feedRouter.delete('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield feedRepository_1.default.deleteEntity(req.body.pk, req.body.rk);
            res.status(200).json(result);
            res.end();
        }));
    }
}
exports.default = new FeedRouter().feedRouter;
