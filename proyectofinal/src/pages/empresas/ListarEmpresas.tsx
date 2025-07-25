import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { empresa } from "../../interfaces/Empresa";

const ListarEmpresas = () => {
  const [empresas, setEmpresas] = useState<empresa[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/empresas")
      .then((res) => res.json())
      .then((data: empresa[]) => setEmpresas(data));
  }, []);
  return (
    <>
      <Tablas
        items={[
          "Id",
          "Nombre",
          "Direccion",
          "Telefono",
          "Estado",
          "Logo",
          "Modificar",
          "Eliminar",
        ]}
      >
        {empresas.map((empresa) => (
          <tr className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {empresa.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {empresa.nombre}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {empresa.direccion}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {empresa.telefono}
            </td>
            <td className="px-4 py-2 text-center">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  empresa.estado === "activo"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {empresa.estado}
              </span>
            </td>
            <td className="px-4 py-2 text-center">
              {empresa.logo && (
                <img
                  src={`http://127.0.0.1:8000/storage/${empresa.logo}`}
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
export default ListarEmpresas;
