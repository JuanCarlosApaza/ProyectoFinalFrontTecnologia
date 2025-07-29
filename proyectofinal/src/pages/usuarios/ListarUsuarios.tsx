import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { usuarios } from "../../interfaces/Usuarios";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import BotonEliminar from "../../components/BotonEliminar";

const ListarUsuarios = () => {
  const [usuarioss, setusuarios] = useState<usuarios[]>([]);

  const obtenerUsuarios = () => {
  const token = localStorage.getItem("token"); 
  fetch("http://127.0.0.1:8000/api/usuarios", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("No autorizado");
      }
      return res.json();
    })
    .then((data: usuarios[]) => setusuarios(data))
    .catch((err) => {
      console.error(err);
    });
};
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleEliminar = (exito: boolean) => {
    if (exito) {
      obtenerUsuarios();
    } else {
      alert("Error al eliminar el usuario.");
    }
  };

  return (
    <>
      <Boton link="/crearusuario" name="Crear Usuario" color="bg-black" />
      <Tablas items={["Id", "Nombre", "Email", "Modificar", "Eliminar"]}>
        {usuarioss.map((usuario) => (
          <tr key={usuario.id} className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {usuario.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {usuario.name}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {usuario.email}
            </td>
            <td className="px-4 py-2 text-center">
              <Link to={`/editarusuarios/${usuario.id}`}>
                <button className="bg-green-400 text-white p-2 hover:bg-green-900 rounded">
                  Modificar
                </button>
              </Link>
            </td>
            <td className="px-4 py-2 text-center">
              <BotonEliminar
                url="usuarios/eliminar"
                id={usuario.id.toString()}
                accion={handleEliminar}
              />
            </td>
          </tr>
        ))}
      </Tablas>
    </>
  );
};

export default ListarUsuarios;
