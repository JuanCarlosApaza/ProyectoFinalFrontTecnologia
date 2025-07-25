import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { detalles } from "../../interfaces/Detalles";

const Listardetalless = () => {
  const [detalless, setdetalless] = useState<detalles[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/detalleventa")
      .then((res) => res.json())
      .then((data: detalles[]) => setdetalless(data));
  }, []);
  return (
    <>
      <Tablas
        items={[
          "Id",
          "Nombre Prodcuto",
          "Nombre Comprador",
          "Cantidad",
          "Precio Unitario",
          "Fecha de Compra",
          "Estado",
          
        ]}
      >
        {detalless.map((detalles) => (
            
          <tr className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {detalles.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {detalles.producto.nombre}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {detalles.venta.usuario.name}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {detalles.cantidad}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {detalles.producto.precio}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {detalles.created_at}
            </td>
            <td className="px-4 py-2 text-center">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  detalles.estado === "activo"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {detalles.estado}
              </span>
            </td>
            
            
          </tr>
        ))}
      </Tablas>
    </>
  );
};
export default Listardetalless;
