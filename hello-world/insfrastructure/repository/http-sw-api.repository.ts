import { inject, injectable } from "tsyringe";
import PersonaEntity from "../../domain/entity/persona.entity";
import { PersonaRepository } from "../../domain/repository/persona.repository";
import { SwApiServiceImpl } from "../http/sw-api-service";
import { SwApiService } from "../../domain/service/sw-api-interface";



@injectable()
export class HttpSwApiRepository implements PersonaRepository{
     
    constructor(
        @inject(SwApiServiceImpl) private _SwApiService: SwApiService,
    ){
    }

    async getAll(): Promise<PersonaEntity[]> {
       console.log("ingresando a getAll");
        const sw_api_url  = process.env.SW_API_URL;
        const data: any = await this._SwApiService.callGetApi(`${sw_api_url}`,"/api/people/");
       
       const personas:PersonaEntity[] = [];
       if(data.status=='200'){
            data.data.results.forEach((element:any)=>{
                 const persona = new PersonaEntity();
                 persona.altura = element.height;
                 persona.nombre = element.name;
                 persona.peso = element.mass;
                 persona.color_cabello = element.hair_color;
                 persona.color_piel = element.skin_color;
                 persona.color_ojo = element.eye_color;
                 persona.anio_nacimiento = element.birth_year;
                 persona.genero = element.gender;
                 persona.planeta_procedencia = element.homeworld;
                 persona.peliculas = element.films;
                 persona.especies = element.species;
                 persona.vehiculos  = element.vehicles;
                 persona.naves = element.starships;
                 persona.fecha_creacion = element.created;
                 persona.fecha_modificacion = element.edited;
                 persona.url = element.url;
                 personas.push(persona);
            });
       }
       return personas;
    }
   
    async getById(id: number): Promise<PersonaEntity> {
       const sw_api_url  = process.env.SW_API_URL;
       console.log("sw_api_url",sw_api_url);
       const data: any = await this._SwApiService.callGetApi(`${sw_api_url}`,`/api/people/${id}`);
      
       // console.log(data);
       const  persona  = new PersonaEntity();
       if(data.status=='200'){
            
            persona.altura = data.data.height;
            persona.nombre = data.data.name;
            persona.peso = data.data.mass;
            persona.color_cabello = data.data.hair_color;
            persona.color_piel = data.data.skin_color;
            persona.color_ojo = data.data.eye_color;
            persona.anio_nacimiento = data.data.birth_year;
            persona.genero = data.data.gender;
            persona.planeta_procedencia = data.data.homeworld;
            persona.peliculas = data.data.films;
            persona.especies = data.data.species;
            persona.vehiculos  = data.data.vehicles;
            persona.naves = data.data.starships;
            persona.fecha_creacion = data.data.created;
            persona.fecha_modificacion = data.data.edited;
            persona.url = data.data.url;
       }
       return persona;
    }

}