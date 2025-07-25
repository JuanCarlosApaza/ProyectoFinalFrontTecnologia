import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { promociones } from "../../interfaces/Promociones";

const ListarPromociones= () => {
  const [promocioness, setpromociones] = useState<promociones[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/promociones")
      .then((res) => res.json())
      .then((data: promociones[]) => setpromociones(data));
  }, []);
  return (
    <>
      <Tablas
        items={[
          "Id",
          "Nombre",
          "Estado",
          "Imagen",
          "Modificar",
          "Eliminar",
        ]}
      >
        {promocioness.map((promociones) => (
          <tr className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {promociones.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {promociones.producto.nombre}
            </td>
            
            <td className="px-4 py-2 text-center">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  promociones.estado ==true
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {promociones.estado}
              </span>
            </td>
            <td className="px-4 py-2 text-center">
              {promociones.imagen && (
                <img
                  src={`http://127.0.0.1:8000/storage/${promociones.imagen}`}
                  alt="logo"
                  className="w-10 h-10 object-cover rounded-full mx-auto shadow"
                />
              )}
            </td>
            <td className="px-4 py-2 text-center">
              <button>Modificar</button>
            </td>
            <td className="px-4 py-2 text-center">
              <button>Eliminar</button>
            </td>
          </tr>
        ))}
      </Tablas>
    </>
  );
};
export default ListarPromociones;
