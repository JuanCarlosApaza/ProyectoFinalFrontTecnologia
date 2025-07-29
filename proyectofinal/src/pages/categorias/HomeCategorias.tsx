import { useEffect, useState } from "react";
import type { categoria } from "../../interfaces/Categoria";
import CartaCircular from "../../components/CartaCircular";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import { useAuth } from "../../context/AuthContext";

const HomeCategorias = () => {
  const [categoria, setCategoria] = useState<categoria[]>([]);
    const { user } = useAuth();
  
  const listar = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/categoriasfiltrar/estado/1`
    );
    const data: categoria[] = await res.json();
    setCategoria(data);
  };
  useEffect(() => {
    listar();
  }, []);
  return (
    <>
      <div className="w-[60%]  mx-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-4xl">Categorias</h1>
          {user && (
            <Boton
              link="/listarcategorias"
              name="Listar Categorias"
              color="bg-black"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {categoria.map((cat) => (
            <div key={cat.id} className="flex justify-center">
              <Link to={`/categorias/id_categoria/${cat.id}`}>
                <CartaCircular
                  imagen={cat.imagen}
                  titulo={cat.nombre}
                  fondo={cat.fondo}
                  colortexto={cat.texto}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HomeCategorias;
