import express from "express";
import DepartmentController from "../controllers/departmentController";

class DepartmentRouter {
    public departmentRouter;
    constructor() {
        this.departmentRouter = express.Router();
        this.defineRouter();
    }
    defineRouter() {

        this.departmentRouter.all('/', async (req, res, next) => {
            next();
        });
        /** 
        * @swagger 
        * /employees/: 
        *   get: 
        *     description: Get Employee by Id
        *     parameters:
        *       - name: did
        *         in: query
        *         description: Department ID
        *         required: true
        *     responses:  
        *       200: 
        *         description: Success  
        *   
        */
        this.departmentRouter.get('/', async (req, res, next) => {
            const department = await DepartmentController.HttpGet(req.query);
            res.status(department.status).json(department.body);
            res.end();
        });
        this.departmentRouter.post('/', async (req, res, next) => {
            const department = await DepartmentController.HttpPost(req.body);
            res.status(department.status).json(department);
            res.end();
        });
        this.departmentRouter.put('/', async (req, res, next) => {
            const department = await DepartmentController.HttpPut(req.body);
            res.status(department.status).json(department);
            res.end();
        });
        /** 
        * @swagger 
        * /departments/: 
        *   get: 
        *     description: Get Department by Id
        *     parameters:
        *       - name: did
        *         in: query
        *         description: Department ID
        *         required: true
        *     responses:  
        *       200: 
        *         description: Success  
        *   
        */
        this.departmentRouter.delete('/', async (req, res, next) => {
            const department = await DepartmentController.HttpDelete(req.query);
            res.status(department.status).json(department);
            res.end();
        });
    }
}


export default new DepartmentRouter().departmentRouter;