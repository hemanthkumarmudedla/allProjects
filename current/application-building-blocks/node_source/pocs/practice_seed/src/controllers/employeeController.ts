import { Employee } from "../entities/employee";
import EmployeeValidator from "../validators.ts/employeeValidator";
import { BaseController } from "./baseController";

class EmployeeController extends BaseController {
    entity: any;
    constructor() {
        super();
        this.entity = Employee;
    }
    HttpGet(qp: any) {
        const id = {
            employeeId: Number(qp['eid'])
        }
        return this.Get(id);
        
    }
    HttpPost(record: any) {
        const idValue = record.employeeId;
        const idObject = {
            employeeId: idValue
        }
        const validatedRecord = EmployeeValidator.employeeValidator(record);
        return this.Post(idObject,idValue ,validatedRecord);
    }
    HttpPut(record: any) {
        const idValue = record.employeeId;
        const idObject = {
            employeeId: idValue
        }
        delete record.employeeId;
        const validatedRecord = EmployeeValidator.employeeValidator(record);
        return this.Put(idObject, idValue, validatedRecord);
    }
    HttpDelete(qp: any) {
        const id = {
            employeeId: Number(qp['eid'])
        }
        return this.Delete(id);
    }
}

export default new EmployeeController();