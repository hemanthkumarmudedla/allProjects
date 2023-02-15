"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    constructor() { }
    Success(record) {
        return { "status": 200, "body": { "data": record, "message": "Your request was Successful" } };
    }
    NotFound() {
        return { "status": 400, "body": { "error": "Not Found", "message": "Not Found any records with given id" } };
    }
    UsernameNotFound() {
        return { "status": 400, "body": { "error": "Username Not Found", "message": "Not Found any records with given username" } };
    }
    Unauthorized() {
        return { "status": 401, "body": { "error": "Unauthorized", "message": "Wrong Password" } };
    }
    ValidationError(msg) {
        return { "status": 403, "body": { "error": "Validation Error", "message": msg } };
    }
    DuplicateEntry() {
        return { "status": 409, "body": { "error": "Duplicate Entry", "message": "Sorry, you are calling Post method on an existing id" } };
    }
    InternalServerError() {
        return { "status": 500, "body": { "error": "Internal Server Error", "message": "Sorry, server error please try again" } };
    }
}
exports.default = new ResponseHandler();
