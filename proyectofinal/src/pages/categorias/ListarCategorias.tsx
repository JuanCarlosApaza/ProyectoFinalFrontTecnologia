import { useEffect, useState } from "react";
import type { categoria } from "../../interfaces/Categoria";
import Tablas from "../../components/Tablas";
import { Link } from "react-router-dom";

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState<categoria[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categorias")
      .then((res) => res.json())
      .then((data: categoria[]) => setCategorias(data));
  }, []);
  return (
    <>
      <Tablas
        items={["Id", "Nombre", "Estado", "Imagen", "Modificar", "Eliminar"]}
      >
        {categorias.map((categoria) => (
          <tr>
            <td>{categoria.id}</td>
            <td>{categoria.nombre}</td>
            <td>{categoria.estado}</td>
            <td>
              {categoria.imagen && (
                <img
                  src={`http://127.0.0.1:8000/storage/${categoria.imagen}`}
                  alt=""
                  className="w-10"
                />
              )}
            </td>
            <td><Link to={`/editarcategoria/${categoria.id}`}><button>Modificar</button></Link></td>
            <td><button>Eliminar</button></td>
          </tr>
        ))}
      </Tablas>
    </>
  );
};
export default ListarCategorias;
