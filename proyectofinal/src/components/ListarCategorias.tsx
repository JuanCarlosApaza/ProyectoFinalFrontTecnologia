import { useEffect, useState } from "react";
import type { categoria } from "../interfaces/Categoria";

const NabvarCategorias = () => {
  const [categorias, setCategorias] = useState<categoria[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categoriasfiltrar")
      .then((res) => res.json())
      .then((data: categoria[]) => setCategorias(data));
  }, []);
  return(
    <>
    <div className="flex overflow-x-auto space-x-4 p-4 bg-white rounded shadow scroll-smooth justify-end">
        {categorias.map((categoria)=>(
            <button className="bg-blue-100 rounded p-2 ">{categoria.nombre}</button>
        ))}

    </div>
    </>

  );
};
export default NabvarCategorias;
