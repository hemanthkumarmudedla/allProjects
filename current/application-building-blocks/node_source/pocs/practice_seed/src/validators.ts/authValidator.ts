import joi from "joi";

class AuthValidator {
    public schema;
    constructor() {
        this.schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required(),
        });
    }
    authValidator(obj: any) {
        return this.schema.validate(obj);
    }
}

export default new AuthValidator();