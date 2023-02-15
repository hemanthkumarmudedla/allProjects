import joi from "joi";

class DepartmentValidator {
    public schema;
    constructor() {
        this.schema = joi.object({
            deptId: joi.number().integer().required(),
            deptName: joi.string().min(3).max(30).required(),

        })
    }
    departmentValidator(obj: any) {
        return this.schema.validate(obj);
    }
}

export default new DepartmentValidator();