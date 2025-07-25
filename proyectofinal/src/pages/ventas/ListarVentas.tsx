import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { ventas } from "../../interfaces/Ventas";

const Listarventass = () => {
  const [ventass, setventass] = useState<ventas[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ventas")
      .then((res) => res.json())
      .then((data: ventas[]) => setventass(data));
  }, []);
  return (
    <>
      <Tablas
        items={[
          "Id",
          "Nombre Usuario",
          "Metodo Pago",
          "Total",
          "Estado",
          "Modificar",
          "Eliminar",
        ]}
      >
        {ventass.map((ventas) => (
          <tr className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {ventas.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {ventas.usuario.name}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {ventas.metodo_pago}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {ventas.total}
            </td>
            
            <td className="px-4 py-2 text-center">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  ventas.estado === "pagado"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {ventas.estado}
              </span>
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
export default Listarventass;
