import type { producto } from "./Producto";
import type { ventas } from "./Ventas";

export interface detalles{
    id:number,
    cantidad:number,
    estado:string,
    id_producto:number,
    producto:producto,
    id_venta:number,
    venta:ventas,
    created_at:string
}