import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { empresa } from "../../interfaces/Empresa";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import BotonEliminar from "../../components/BotonEliminar"; // importar componente
import Swal from "sweetalert2";

const ListarEmpresas = () => {
  const [empresas, setEmpresas] = useState<empresa[]>([]);

  const obtenerEmpresas = async () => {
    try {
      const savedtoken = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/api/empresasadmin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${savedtoken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al obtener empresas.");
      }

      const data: empresa[] = await res.json();
      setEmpresas(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudieron cargar las empresas.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  const handleEliminar = (exito: boolean) => {
    if (exito) {
      obtenerEmpresas();
    } else {
      alert("Error al eliminar empresa.");
    }
  };

  return (
    <>
      <Boton link="/crearempresas" name="Crear Empresa" color="bg-black" />

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
          <tr
            key={empresa.id}
            className="border-b hover:bg-gray-100 transition"
          >
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
              <Link to={`/editarempresas/${empresa.id}`}>
                <button className="bg-green-400 text-white p-2 hover:bg-green-900 rounded">
                  Modificar
                </button>
              </Link>
            </td>
            <td className="px-4 py-2 text-center">
              <BotonEliminar
                url="empresas/eliminar"
                id={empresa.id.toString()}
                accion={handleEliminar}
              />
            </td>
          </tr>
        ))}
      </Tablas>
    </>
  );
};

export default ListarEmpresas;
