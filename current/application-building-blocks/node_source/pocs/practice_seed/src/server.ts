import express from "express";
import morgan from "morgan";

import { AppData } from "./app-data";
import bodyParser from "body-parser";
import employeeRouter from "./routers/employeeRouter";
import departmentRouter from "./routers/departmentRouter";
import AzureServiceBus from "./azure-service-bus";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRouter from "./routers/authRouter";

const port = 3000;
const host = 'localhost';

class Server {
    public app;
    constructor() {
        this.app = express();
        AzureServiceBus.connectToServiceBus({body: "Hemanth Mudedla"});
        //this.createConnection();
    }
    createConnection() {
        AppData.initialize().then(() => {
            console.log("Connection Established");
            this.defineMiddleware();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    defineMiddleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.mountRoutes(); 
        this.configureSwagger();
        this.run();
    }
    mountRoutes() {
        this.app.use('/employees', employeeRouter);
        this.app.use('/departments', departmentRouter);
        this.app.use('/authenticate', authRouter);
    }
    configureSwagger() {
        const swaggerOptions = {
            swaggerDefinition: {  
                info: {  
                    title:'Employee API',  
                    version:'1.0.0'  
                }  
            },  
            apis:['./src/routers/**/*.ts'],  
        }
        const swaggerDocs = swaggerJsdoc(swaggerOptions);
        this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }
    run() {
        this.app.listen(port, host, () => {
            return console.log(`Server is listening on http://${host}:${port}`);
        })
    }
}

export default new Server().app;