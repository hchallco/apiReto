export class ProductoDTO {
    id: number;
    nombre: string;
    
     
    constructor(productCreate:{id:number,nombre:string}){
        const {id,nombre} = productCreate;
        this.id = id;
        this.nombre = nombre;
        
    }
}
