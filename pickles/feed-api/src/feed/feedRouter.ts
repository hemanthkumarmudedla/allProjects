import express from "express";
import FeedRepository from "./feedRepository";

class FeedRouter {
    public feedRouter;
    constructor() {
        this.feedRouter = express.Router();
        this.defineRouter();
    }
    defineRouter() {
        this.feedRouter.all('/', async (req, res, next) => {
            next();
        });
        this.feedRouter.post('/', async (req, res, next) => {
            const result = await FeedRepository.createEntity(req.body);
            res.status(200).json(result);
            res.end();
        });
        this.feedRouter.get('/', async (req, res, next) => {
            const result = await FeedRepository.getEntity(req.body.pk, req.body.rk);
            res.status(200).json(result);
            res.end();
        });
        this.feedRouter.put('/', async (req, res, next) => {
            const result = await FeedRepository.createEntity(req.body);
            res.status(200).json(result);
            res.end();
        });
        this.feedRouter.delete('/', async (req, res, next) => {
            const result = await FeedRepository.deleteEntity(req.body.pk, req.body.rk);
            res.status(200).json(result);
            res.end();
        });
    }
}


export default new FeedRouter().feedRouter;