import AuthValidator from "../validators.ts/authValidator";
import ResponseHandler from "../handlers/responseHandler";
import { AppData } from "../app-data";
import { Employee } from "../entities/employee";
import jwt from "json-web-token";
import crypto, { randomBytes } from "crypto";
class AuthController {
    async HttpPost(record: any) {

        const validatedRecord = AuthValidator.authValidator(record)
        try {
            if (validatedRecord.error) {
                return ResponseHandler.ValidationError(validatedRecord.error);
            }
            else {
                const record = validatedRecord.value;
                const username = record.username;
                const password = record.password;
                const repository = AppData.getRepository(Employee);
                const findUser = await repository.findOneBy({username: username});
                if (!findUser) {
                    return ResponseHandler.UsernameNotFound();
                }
                else {
                    const secret = crypto.randomBytes(64).toString('hex');
                    if (findUser.password === password) {
                        const token = {
                            token: secret
                        }
                        return ResponseHandler.Success(token);
                    }
                    else return ResponseHandler.Unauthorized();
                }
            }
        }
        catch(error) {
            return ResponseHandler.InternalServerError();
        }
    }
}

export default new AuthController();