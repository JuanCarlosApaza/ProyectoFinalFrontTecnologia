import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { promociones } from "../../interfaces/Promociones";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import BotonEliminar from "../../components/BotonEliminar";

const ListarPromociones = () => {
  const [promocioness, setpromociones] = useState<promociones[]>([]);

  const obtenerPromociones = () => {
    fetch("http://127.0.0.1:8000/api/promociones")
      .then((res) => res.json())
      .then((data: promociones[]) => setpromociones(data));
  };

  useEffect(() => {
    obtenerPromociones();
  }, []);

  const handleEliminar = (exito: boolean) => {
    if (exito) {
      obtenerPromociones();
    } else {
      alert("Error al eliminar la promoción.");
    }
  };

  return (
    <>
      <Boton link="/crearpromocion" name="Crear Promoción" color="bg-black" />
      <Tablas items={["Id", "Nombre", "Estado", "Imagen", "Modificar", "Eliminar"]}>
        {promocioness.map((promocion) => (
          <tr key={promocion.id} className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {promocion.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {promocion.producto.nombre}
            </td>
            <td className="px-4 py-2 text-center">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  promocion.estado
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {promocion.estado ? "Activo" : "Inactivo"}
              </span>
            </td>
            <td className="px-4 py-2 text-center">
              {promocion.imagen && (
                <img
                  src={`http://127.0.0.1:8000/storage/${promocion.imagen}`}
                  alt="promoción"
                  className="w-10 h-10 object-cover rounded-full mx-auto shadow"
                />
              )}
            </td>
            <td className="px-4 py-2 text-center">
              <Link to={`/editarpromociones/${promocion.id}`}>
                <button className="bg-green-400 text-white p-2 hover:bg-green-900 rounded">
                  Modificar
                </button>
              </Link>
            </td>
            <td className="px-4 py-2 text-center">
              <BotonEliminar
                url="promociones/eliminar"
                id={promocion.id.toString()}
                accion={handleEliminar}
              />
            </td>
          </tr>
        ))}
      </Tablas>
    </>
  );
};

export default ListarPromociones;
