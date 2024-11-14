import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { container } from "tsyringe";
import { PersonaController } from "../insfrastructure/controller/persona.controller";

const controller = container.resolve(PersonaController); 

export const lambdaHandlerGetAllPersona = async (event: APIGatewayProxyEvent | any): Promise<APIGatewayProxyResult> => {
    
    const uniqueUrl: string = `${
		event.httpMethod || event?.requestContext?.http?.method
	}:${event.path || event?.requestContext?.http?.path}`;
	console.log("UNIQUE_URL :: ", uniqueUrl);
    
    return await controller.getPersonaAll();
};

export const lambdaHandlerGetPersona = async (event: APIGatewayProxyEvent | any): Promise<APIGatewayProxyResult> => {
    
    const uniqueUrl: string = `${
		event.httpMethod || event?.requestContext?.http?.method
	}:${event.path || event?.requestContext?.http?.path}`;
	console.log("UNIQUE_URL :: ", uniqueUrl);
    
    return await controller.getPersona(event)
};