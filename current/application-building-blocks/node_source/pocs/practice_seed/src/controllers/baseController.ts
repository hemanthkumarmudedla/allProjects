import { AppData } from "../app-data";
import responseHandler from "../handlers/responseHandler";
import ResponseHandler from "../handlers/responseHandler";

export abstract class BaseController {

    abstract entity: any;
    constructor() { }

    async Get(id: any) {
        try {
            const repository = AppData.getRepository(this.entity);
            const getRecord = await repository.findOneBy(id);
            if (!getRecord) {
                return ResponseHandler.NotFound();
            }
            else return ResponseHandler.Success(getRecord);
        }
        catch (err) {
            return ResponseHandler.InternalServerError();
        }
    }
    async Post(idObject: any, idValue: number, validatedRecord: any) {
        try {
            if (validatedRecord.error) {
                return ResponseHandler.ValidationError(validatedRecord.error);
            }
            else {
                const record = validatedRecord.value;
                const repository = AppData.getRepository(this.entity);
                if (!idValue) {
                    await repository.save(record);
                    return ResponseHandler.Success(record);
                }
                else {
                    const selectRecord = await repository.findOneBy(idObject);
                    if (!selectRecord) {
                        await repository.save(record);
                        return ResponseHandler.Success(record);
                    }
                    else return ResponseHandler.DuplicateEntry();
                }
            }
        }
        catch (err) {
            return ResponseHandler.InternalServerError();
        }
    }
    async Put(idObject: any, idValue: number, validatedRecord: any) {
        try {
            if (validatedRecord.error) {
                return ResponseHandler.ValidationError(validatedRecord.error);
            }
            else {
                const record = validatedRecord.value;
                const repository = AppData.getRepository(this.entity);
                const selectRecord = await repository.findOneBy(idObject);
                if (!selectRecord) {
                    return ResponseHandler.NotFound();
                }
                else {
                    await repository.update(idValue, record);
                    const getRecord = await repository.findOneBy(idObject);
                    return ResponseHandler.Success(getRecord);
                }
            }
        }
        catch (err) {
            return ResponseHandler.InternalServerError();
        }
    }
    async Delete(id: any) {

        const repository = AppData.getRepository(this.entity);
        const selectRecord = await repository.findOneBy(id);
        if (!selectRecord) {
            return ResponseHandler.NotFound();
        }
        else {
            await repository.remove(id);
            return ResponseHandler.Success(selectRecord);
        }
    }
}