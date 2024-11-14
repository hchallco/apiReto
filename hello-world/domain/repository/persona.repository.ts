import PersonaEntity from "../entity/persona.entity";

export interface PersonaRepository {
    getAll():Promise<PersonaEntity[]>;
    getById(id:number):Promise<PersonaEntity>;
}