import type { categoria } from "./Categoria";
import type { empresa } from "./Empresa";


export interface producto{
    id:number,
    nombre:string,
    id_empresa:number,
    empresa:empresa,
    id_categoria:number,
    categoria:categoria,
    precio:number,
    cantidad:number,
    descripcion:string,
    estado:string,
    imagen:string,
    descuento:number

};
export interface productoForm{
    nombre:string,
    id_empresa:number,
    id_categoria:number,
    precio:number,
    cantidad:number,
    descripcion:string,
    imagen:File|null,
    descuento:number

};