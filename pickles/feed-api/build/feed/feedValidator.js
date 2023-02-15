"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class FeedValidator {
    constructor() {
        this.schema = joi_1.default.object({
            employeeId: joi_1.default.number().integer(),
            firstName: joi_1.default.string().min(3).max(30).required(),
            lastName: joi_1.default.string().min(3).max(30).required(),
            username: joi_1.default.string().min(3).max(30).required(),
            password: joi_1.default.string().min(6).max(20).required(),
            dateOfBirth: joi_1.default.date().required(),
            mobileNo: joi_1.default.string().min(10).max(10).required(),
            location: joi_1.default.string().min(3).max(30).required(),
        });
    }
    feedValidator(obj) {
        return this.schema.validate(obj);
        ;
    }
}
exports.default = new FeedValidator();
