import { injectable } from "tsyringe";
import ProductoEntity from "../../domain/entity/producto.entity";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

@injectable()
export class DynamoProductoRepository implements ProductoRepository{
    
    constructor(){       
    }
    async save(producto: ProductoEntity): Promise<ProductoEntity> {
        
        var params = {
            TableName : tableName,
            Item: { id : producto.id, name: producto.nombre }
        };
        console.log("put params to dynamo ",params)
        try {
            const data = await ddbDocClient.send(new PutCommand(params));
            console.log("Success - item added or updated", data);
            return producto;
          } catch (err) {
            console.log("Error", err);
            throw err;
          }
    }
    async get(id: number): Promise<ProductoEntity> {
        var params = {
            TableName : tableName,
            Key: { id: id },
        };
        console.log("get params to dynamo ",params)
        try {
            const data = await ddbDocClient.send(new GetCommand(params));
            var item = data.Item;
            const producto = new ProductoEntity();
            if(data.Item){
                producto.id = data.Item.id;
                producto.nombre = data.Item.name;
            }
            return producto;
        } catch (err) {
            console.log("Error", err);
            throw err;
        }
    }



}