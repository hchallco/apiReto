import { inject, injectable } from "tsyringe";
import { PersonUseCase } from "../../application/persona-use-case";
import { APIGatewayProxyEvent } from "aws-lambda";

@injectable()
export class PersonaController {

    constructor( @inject(PersonUseCase) private _personUseCase : PersonUseCase ){

    }

    async getPersonaAll(){
        try{
            const page = 1;
            const data = await this._personUseCase.getAllPesonas(page);
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

    async getPersona(event : APIGatewayProxyEvent){
        try{
            const id = event.pathParameters?.id as unknown as number;
            const data = await this._personUseCase.getPerson(id);
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