import { Link } from "react-router-dom";
import CartaCircular from "../../components/CartaCircular";
import type { empresa } from "../../interfaces/Empresa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import Boton from "../../components/Boton";

const HomeEmpresas = () => {
  const [empresa, setEmpresas] = useState<empresa[]>([]);
  const { user } = useAuth();
  const listar = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/empresas/filtrar/estado/Activo`
      );

      if (!res.ok) {
        const errorData = await res.json();
        const mensajes =
          errorData.message || "Error desconocido al obtener empresas.";
        throw new Error(mensajes);
      }

      const data: empresa[] = await res.json();
      setEmpresas(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar empresas",
        text: error.message || "Ocurrió un error inesperado.",
      });
    }
  };

  useEffect(() => {
    listar();
  }, []);
  return (
    <>
      <div className="w-[60%]  mx-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-4xl">Empresas</h1>
          {user && (
            <Boton
              link="/listarempresas"
              name="Listar Empresa"
              color="bg-black"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {empresa.map((cat) => (
            <div key={cat.id} className="flex justify-center">
              <Link to={`/empresas/id_empresa/${cat.id}`}>
                <CartaCircular
                  imagen={cat.logo}
                  titulo={cat.nombre}
                  fondo={cat.fondo}
                  colortexto={cat.texto}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HomeEmpresas;
