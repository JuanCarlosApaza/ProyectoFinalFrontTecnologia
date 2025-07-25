import type { usuarios } from "./Usuarios";

export interface ventas{
    id:number,
    id_usuario:number,
    usuario:usuarios,
    metodo_pago:string,
    total:number,
    estado:string,
}