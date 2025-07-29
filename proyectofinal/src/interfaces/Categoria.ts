export interface categoria{
    id:number,
    nombre:string,
    imagen:string,
    texto:string,
    fondo:string,
    estado:boolean

};
export interface CategoriaForm {
  nombre: string;
  imagen: File | null; 
  texto:string,
  fondo:string, 
}