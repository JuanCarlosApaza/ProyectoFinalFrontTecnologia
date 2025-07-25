import type { producto } from "./Producto";

export interface promociones{
    id:number,
    imagen:string,
    estado:boolean,
    id_producto:number,
    producto:producto,
    
}
export interface promocionesForm{
    imagen:File|null,
    id_producto:number,    
}