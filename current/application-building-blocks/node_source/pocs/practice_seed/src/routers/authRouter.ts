import express from "express";
import AuthController from "../controllers/authController";

class AuthRouter {
    public authRouter;
    constructor() {
        this.authRouter = express.Router();
        this.defineRouter();
    }
    defineRouter() {
        this.authRouter.all('/', async (req, res, next) => {
            next();
        });
        this.authRouter.post('/', async (req, res, next) => {
            const authenticate = await AuthController.HttpPost(req.body);
            res.status(authenticate.status).json(authenticate.body);
            res.end();
        });
    }
}

export default new AuthRouter().authRouter;