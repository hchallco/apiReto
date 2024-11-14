import { inject, injectable } from "tsyringe";
import { ProductoUseCase } from "../../application/producto-use-case";
import ProductoEntity from "../../domain/entity/producto.entity";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ProductoDTO } from "../../application/producto.dot";

@injectable()
export class ProductoController{
    constructor(@inject(ProductoUseCase) private _productoUseCase:ProductoUseCase){

    }
    
    async putProduct(event : APIGatewayProxyEvent){
        try{
        const productoDto = new ProductoDTO(JSON.parse(event?.body as string));
        const data = await this._productoUseCase.putProduct(productoDto);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        }catch(error){
            console.log(error)
            return {
              statusCode: 500,
              body: JSON.stringify({ message: (error as Error).message }),
            }
        }   
    }

    async getProduct(event : APIGatewayProxyEvent){
        try{
            const id = event.pathParameters?.id as unknown as number;
            console.log("id::",id);
            const data = await this._productoUseCase.getProduct(id);
            return {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        }catch(error){
            console.log(error)
            return {
                statusCode: 500,
                body: JSON.stringify({ message: (error as Error).message }),
            }
        }  
    }
}