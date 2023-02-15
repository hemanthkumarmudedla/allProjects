import { TableClient } from '@azure/data-tables';
import { BlobServiceClient } from '@azure/storage-blob';

class FeedRepository {
    tableName = "feed";
    containerName = "feed";
    conString = "DefaultEndpointsProtocol=https;AccountName=instaclonestorageaccount;AccountKey=mC19sXIEWnkGyr+KSAHEnxUFDjqUTMhCx/i0nYnJKmlG3h2kzwPAnzmm8MyBrH8HfXGU+lCak1FG+ASte3bjqA==;EndpointSuffix=core.windows.net";
    public table;
    public container;
    constructor() {
        this.table = TableClient.fromConnectionString(this.conString, this.tableName);
        this.container = BlobServiceClient.fromConnectionString(this.conString).getContainerClient(this.containerName);
    }
    async createEntity(entity: any) {
        let blob = await this.createBlob(entity);
        entity.blobName = blob.blobName;
        let result = await this.table.createEntity(entity);
        return result;
    }
    async getEntity(pk: string, rk: string) {
        let result = await this.table.getEntity(pk, rk);
        let blob = await this.getBlob(result);
        return { result, blob };
    }
    async updateEntity(entity: any) {
        let result = await this.table.upsertEntity(entity, "Merge");
        return result;
    }
    async deleteEntity(pk: string, rk: string) {
        let result = await this.table.deleteEntity(pk, rk);
        return result;
    }
    async createBlob(entity: any) {
        let blobName = entity.partitionKey + entity.rowKey;
        let result = await this.container.uploadBlockBlob(blobName, entity.blob, Buffer.byteLength(blobName));
        return { result, blobName};
    }
    async getBlob(entity: any) {
        let result = await this.container.getBlobClient(entity.blobName);
        return result;
    } 
}
export default new FeedRepository();