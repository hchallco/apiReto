import { inject, injectable } from "tsyringe";
import { DynamoProductoRepository } from "../insfrastructure/repository/dynamo.producto.repository";
import { ProductoRepository } from "../domain/repository/producto.repository";
import ProductoEntity from "../domain/entity/producto.entity";
import { ProductoDTO } from "./producto.dot";

@injectable()
export class ProductoUseCase{
    constructor(@inject(DynamoProductoRepository) private productoRepository: ProductoRepository){

    }
    async putProduct(producto:ProductoDTO){
        const roductoEntity  = new ProductoEntity();
        roductoEntity.id = producto.id;
        roductoEntity.nombre = producto.nombre;
        console.log("dentro USECASE ::",roductoEntity);
        const data = await this.productoRepository.save(roductoEntity);
        return data;
    }
    async getProduct(id: number){
        const data = await this.productoRepository.get(id);
        return data;
    }

}