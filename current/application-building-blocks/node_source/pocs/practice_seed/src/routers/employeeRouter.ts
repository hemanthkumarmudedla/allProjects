import express from "express";
import EmployeeController from "../controllers/employeeController";

class EmployeeRouter {
    public employeeRouter;
    constructor() {
        this.employeeRouter = express.Router();
        this.defineRouter();
    }
    defineRouter() {
        this.employeeRouter.all('/', async (req, res, next) => {
            next();
        });
        /** 
        * @swagger 
        * /employees/: 
        *   get: 
        *     description: Get Employee by Id
        *     parameters:
        *       - name: eid
        *         in: query
        *         description: Employee ID
        *         required: true
        *     responses:  
        *       200: 
        *         description: Success  
        *   
        */
        this.employeeRouter.get('/', async (req, res, next) => {
            const employee = await EmployeeController.HttpGet(req.query);
            res.status(employee.status).json(employee.body);
            res.end();
        });
        /**
         *  @swagger
         *  /employees/:
         *      post: 
         *          decription: Add a new Employee
         *          parameters:
         * 
         *          
         *          responses:
         *              200:
         *                  description: Success
         */
        this.employeeRouter.post('/', async (req, res, next) => {
            const employee = await EmployeeController.HttpPost(req.body);
            res.status(employee.status).json(employee.body);
            res.end();
        });
        this.employeeRouter.put('/', async (req, res, next) => {
            const employee = await EmployeeController.HttpPut(req.body);
            res.status(employee.status).json(employee.body);
            res.end();
        });
        /** 
        * @swagger 
        * /employees/: 
        *   delete: 
        *     description: Delete Employee by Id
        *     parameters:
        *       - name: eid
        *         in: query
        *         description: Employee ID
        *         required: true
        *     responses:  
        *       200: 
        *         description: Success  
        *   
        */
        this.employeeRouter.delete('/', async (req, res, next) => {
            const employee = await EmployeeController.HttpDelete(req.query);
            res.status(employee.status).json(employee.body);
            res.end();
        });
    }
}


export default new EmployeeRouter().employeeRouter;