export interface empresa{
    id:number,
    nombre:string,
    logo:string,
    direccion:string,
    telefono:string,
    estado:string
    texto:string,
    fondo:string,
    id_usurio:number
};
export interface empresaForm{
    nombre:string,
    logo:File|null,
    direccion:string,
    telefono:string,
    fondo:string,
    texto:string,
    id_usuario:number
};
