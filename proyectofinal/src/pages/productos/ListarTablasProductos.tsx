import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import BotonEliminar from "../../components/BotonEliminar";
import type { producto } from "../../interfaces/Producto";

const ListarproductosTablas = () => {
  const [productos, setproductos] = useState<producto[]>([]);

  const obtenerProductos = () => {
    fetch("http://127.0.0.1:8000/api/productos")
      .then((res) => res.json())
      .then((data: producto[]) => setproductos(data));
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleEliminar = (exito: boolean) => {
    if (exito) {
      obtenerProductos();
    } else {
      alert("Error al eliminar el producto.");
    }
  };

  return (
    <>
      <Boton link="/crearproductos" name="Crear producto" color="bg-black" />

      <Tablas
        items={[
          "Id",
          "Nombre",
          "Empresa",
          "Categoria",
          "Precio",
          "Cantidad",
          "Descripcion",
          "Estado",
          "Imagen",
          "Descuento",
          "Modificar",
          "Eliminar",
        ]}
      >
        {productos.map((producto) => (
          <tr
            key={producto.id}
            className="border-b hover:bg-gray-100 transition"
          >
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {producto.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {producto.nombre}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {producto.empresa.nombre}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {producto.categoria.nombre}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {producto.precio}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {producto.cantidad}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {producto.descripcion}
            </td>
            <td className="px-4 py-2 text-center">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  producto.estado === "activo"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {producto.estado}
              </span>
            </td>
            <td className="px-4 py-2 text-center">
              {producto.imagen && (
                <img
                  src={`http://127.0.0.1:8000/storage/${producto.imagen}`}
                  alt="producto"
                  className="w-10 h-10 object-cover rounded-full mx-auto shadow"
                />
              )}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {producto.descuento}
            </td>
            <td className="px-4 py-2 text-center">
              <Link to={`/editarproductos/${producto.id}`}>
                <button className="bg-green-400 text-white p-2 hover:bg-green-900 rounded">
                  Modificar
                </button>
              </Link>
            </td>
            <td className="px-4 py-2 text-center">
              <BotonEliminar
                url="productos/eliminar"
                id={producto.id.toString()}
                accion={handleEliminar}
              />
            </td>
          </tr>
        ))}
      </Tablas>
    </>
  );
};

export default ListarproductosTablas;
