import joi from "joi";
import DepartmentValidator from "./departmentValidator";

class EmployeeValidator {
    public schema;
    constructor() {
        this.schema = joi.object({
            employeeId: joi.number().integer(),
            firstName: joi.string().min(3).max(30).required(),
            lastName: joi.string().min(3).max(30).required(),
            username: joi.string().min(3).max(30).required(),
            password: joi.string().min(6).max(20).required(),
            dateOfBirth: joi.date().required(),
            mobileNo: joi.string().min(10).max(10).required(),
            location: joi.string().min(3).max(30).required(),
            dept: DepartmentValidator.schema
        })
    }
    employeeValidator(obj: any) {
        return this.schema.validate(obj);;
    }
}

export default new EmployeeValidator();