import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { container } from "tsyringe";
import { ProductoController } from "../insfrastructure/controller/producto.controller";

const controllerP = container.resolve(ProductoController); 



export const lambdaHandlerPutProducto = async (event: APIGatewayProxyEvent | any): Promise<APIGatewayProxyResult> => {
    
    const uniqueUrl: string = `${
		event.httpMethod || event?.requestContext?.http?.method
	}:${event.path || event?.requestContext?.http?.path}`;
	console.log("UNIQUE_URL :: ", uniqueUrl);
    
    return await controllerP.putProduct(event);
};

export const lambdaHandlerGetProducto = async (event: APIGatewayProxyEvent | any): Promise<APIGatewayProxyResult> => {
    
    const uniqueUrl: string = `${
		event.httpMethod || event?.requestContext?.http?.method
	}:${event.path || event?.requestContext?.http?.path}`;
	console.log("UNIQUE_URL :: ", uniqueUrl);
    
    return await controllerP.getProduct(event);
};