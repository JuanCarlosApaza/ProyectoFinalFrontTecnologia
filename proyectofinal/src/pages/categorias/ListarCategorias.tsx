import { useEffect, useState } from "react";
import type { categoria } from "../../interfaces/Categoria";
import Tablas from "../../components/Tablas";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import BotonEliminar from "../../components/BotonEliminar"; // Asegúrate de importar
import Swal from "sweetalert2";

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState<categoria[]>([]);

  const obtenerCategorias = async () => {
  try {
    const savedtoken = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/api/categoriasadmin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${savedtoken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al obtener categorías.");
    }

    const data: categoria[] = await res.json();
    setCategorias(data);
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "No se pudieron cargar las categorías.",
      timer: 3000,
      showConfirmButton: false,
    });
  }
};

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleEliminar = (exito: boolean) => {
    if (exito) {
      obtenerCategorias(); 
    } else {
      alert("Error al eliminar");
    }
  };

  return (
    <>
      <Boton link="/crearcategoria" name="Crear Categoria" color="bg-black" />

      <Tablas
        items={["Id", "Nombre", "Estado", "Imagen", "Modificar", "Eliminar"]}
      >
        {categorias.map((categoria) => (
          <tr
            key={categoria.id}
            className="border-b hover:bg-gray-100 transition"
          >
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {categoria.id}
            </td>
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {categoria.nombre}
            </td>
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {categoria.estado}
            </td>
            <td className="px-4 py-2 text-center">
              {categoria.imagen && (
                <img
                  src={`http://127.0.0.1:8000/storage/${categoria.imagen}`}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full mx-auto shadow"
                />
              )}
            </td>
            <td className="px-4 py-2 text-center">
              <Link to={`/editarcategoria/${categoria.id}`}>
                <button className="bg-green-400 text-white p-2 hover:bg-green-900 rounded">
                  Modificar
                </button>
              </Link>
            </td>
            <td className="px-4 py-2 text-center">
              <BotonEliminar
                url="categorias/eliminar"
                id={categoria.id.toString()}
                accion={handleEliminar}
              />
            </td>
          </tr>
        ))}
      </Tablas>
    </>
  );
};

export default ListarCategorias;
