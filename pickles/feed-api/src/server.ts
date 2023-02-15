import express from 'express';
import bodyParser from 'body-parser';
import feedRouter from './feed/feedRouter';

class Server {
    public app;
    constructor() {
        this.app = express();
        this.defineMiddleware();
    }
    defineMiddleware() {
        this.app.use(bodyParser.json());
        this.mountRoutes();
        this.run();
    }
    mountRoutes() {
        this.app.use('/', feedRouter);
    }
    run() {
        this.app.listen(3000, 'localhost', () => {
            return console.log(`Server is listening on http://localhost:3000`);
        })
    }
}

export default new Server().app;