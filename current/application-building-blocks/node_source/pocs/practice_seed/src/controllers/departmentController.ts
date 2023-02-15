import { Department } from "../entities/department";
import { BaseController } from "./baseController";
import DepartmentValidator from "../validators.ts/departmentValidator";

class DepartmentController extends BaseController {
    entity: any;
    constructor() {
        super();
        this.entity = Department;
    }
    HttpGet(qp: any) {
        const id = {
            deptId: Number(qp['did'])
        }
        return this.Get(id);
        
    }
    HttpPost(record: any) {
        const idValue = record.deptId;
        const idObject = {
            deptId: idValue
        }
        const validatedRecord = DepartmentValidator.departmentValidator(record);
        return this.Post(idObject,idValue ,validatedRecord);
    }
    HttpPut(record: any) {
        const idValue = record.deptId;
        const idObject = {
            deptId: idValue
        }
        delete record.deptId;
        const validatedRecord = DepartmentValidator.departmentValidator(record);
        return this.Put(idObject, idValue, validatedRecord);
    }
    HttpDelete(qp: any) {
        const id = {
            deptId: Number(qp['did'])
        }
        return this.Delete(id);
    }
}

export default new DepartmentController();