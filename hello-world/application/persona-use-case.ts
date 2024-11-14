import { inject, injectable } from "tsyringe";
import { HttpSwApiRepository } from "../insfrastructure/repository/http-sw-api.repository";
import { PersonaRepository } from "../domain/repository/persona.repository";

//export class PersonaUseCase
@injectable()
export class PersonUseCase{
    constructor(@inject(HttpSwApiRepository) private personaRepository: PersonaRepository){

    }
    async getAllPesonas(page:number){
        const data = await this.personaRepository.getAll();
        return data;
    }
    async getPerson(id:number){
        const data =  await this.personaRepository.getById(id);
        return data;
    }
}