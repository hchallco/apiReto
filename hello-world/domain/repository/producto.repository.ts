import ProductoEntity from "../entity/producto.entity";

export interface ProductoRepository{
    save(producto:ProductoEntity):Promise<ProductoEntity>;
    get(id:number):Promise<ProductoEntity>;
}