export interface empresa{
    id:number,
    nombre:string,
    logo:string,
    direccion:string,
    telefono:string,
    estado:string
};
export interface empresaForm{
    nombre:string,
    logo:File|null,
    direccion:string,
    telefono:string,
};
