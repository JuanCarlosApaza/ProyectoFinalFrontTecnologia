import { useEffect, useState } from "react";
import Tablas from "../../components/Tablas";
import type { usuarios } from "../../interfaces/Usuarios";

const ListarUsuarios = () => {
  const [usuarioss, setusuarios] = useState<usuarios[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/usuarios")
      .then((res) => res.json())
      .then((data: usuarios[]) => setusuarios(data));
  }, []);
  return (
    <>
      <Tablas
        items={[
          "Id",
          "Nombre",
          "Email",
          "Password",
          "Modificar",
          "Eliminar",
        ]}
      >
        {usuarioss.map((usuarios) => (
          <tr className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              {usuarios.id}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {usuarios.name}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {usuarios.email}
            </td>
            <td className="px-4 py-2 text-center text-sm text-gray-800">
              {usuarios.password}
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
export default ListarUsuarios;
