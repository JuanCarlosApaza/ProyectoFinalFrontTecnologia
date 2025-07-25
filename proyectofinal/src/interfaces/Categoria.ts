export interface categoria{
    id:number,
    nombre:string,
    imagen:string,
    estado:boolean

};
export interface CategoriaForm {
  nombre: string;
  imagen: File | null;  
}