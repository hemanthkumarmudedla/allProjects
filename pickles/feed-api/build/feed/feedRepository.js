"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_tables_1 = require("@azure/data-tables");
const storage_blob_1 = require("@azure/storage-blob");
class FeedRepository {
    constructor() {
        this.tableName = "feed";
        this.containerName = "feed";
        this.conString = "DefaultEndpointsProtocol=https;AccountName=instaclonestorageaccount;AccountKey=mC19sXIEWnkGyr+KSAHEnxUFDjqUTMhCx/i0nYnJKmlG3h2kzwPAnzmm8MyBrH8HfXGU+lCak1FG+ASte3bjqA==;EndpointSuffix=core.windows.net";
        this.table = data_tables_1.TableClient.fromConnectionString(this.conString, this.tableName);
        this.container = storage_blob_1.BlobServiceClient.fromConnectionString(this.conString).getContainerClient(this.containerName);
    }
    createEntity(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let blob = yield this.createBlob(entity);
            entity.blobName = blob.blobName;
            let result = yield this.table.createEntity(entity);
            return result;
        });
    }
    getEntity(pk, rk) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.table.getEntity(pk, rk);
            let blob = yield this.getBlob(result);
            return { result, blob };
        });
    }
    updateEntity(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.table.upsertEntity(entity, "Merge");
            return result;
        });
    }
    deleteEntity(pk, rk) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.table.deleteEntity(pk, rk);
            return result;
        });
    }
    createBlob(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let blobName = entity.partitionKey + entity.rowKey;
            let result = yield this.container.uploadBlockBlob(blobName, entity.blob, Buffer.byteLength(blobName));
            return { result, blobName };
        });
    }
    getBlob(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield (yield this.container.getBlobClient(entity.blobName).downloadToBuffer()).toString();
            return result;
        });
    }
}
exports.default = new FeedRepository();
