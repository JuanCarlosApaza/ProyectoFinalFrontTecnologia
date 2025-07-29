import { useEffect, useState } from "react";
import type { producto } from "../../interfaces/Producto";
import Carta from "../../components/Carta";
import Carrito from "../../components/Carrito";
import { useCarrito } from "../../hooks/useCarrito";
import Buscar from "../../components/Buscar";
import Swal from "sweetalert2";
import Boton from "../../components/Boton";
import { useAuth } from "../../context/AuthContext";

const ListarProductos = () => {
  const [productos, setProductos] = useState<producto[]>([]);
  const { agregarProducto } = useCarrito();
  const [busqueda, setBusqueda] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const listar = async () => {
      try {
        const url = busqueda
          ? `http://127.0.0.1:8000/api/productos/search/${busqueda}`
          : "http://127.0.0.1:8000/api/productos";

        const res = await fetch(url);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error al obtener productos.");
        }

        setProductos(data);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudieron cargar los productos.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    };

    listar();
  }, [busqueda]);

  return (
    <>
      <div className="relative">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between items-center gap-x-4 mb-4">
            {user?(
              <>
              <Carrito />
              <Boton
              link="/listarproductostables"
              name="Crear producto"
              color="bg-black"
            />
              </>
            ):<h1 className="text-2xl text-red-500">PARA COMPRAR DEBE INICIAR SESSION</h1>}
            
            <h1 className="text-4xl font-bold">Productos</h1>
          </div>

          <Buscar Buscar={setBusqueda} />
          <div className="grid grid-cols-4 gap-4">
            {productos.map((producto) => (
              <div className="col-span-1">
                <Carta
                  nombre={producto.nombre}
                  empresa={producto.empresa.nombre}
                  categoria={producto.categoria.nombre}
                  precio={producto.precio}
                  descripcion={producto.descripcion}
                  descuento={producto.descuento}
                  imagen={producto.imagen}
                  logo={producto.categoria.imagen}
                  empresalogo={producto.empresa.logo}
                  onclick={() =>
                    agregarProducto(
                      producto.id,
                      producto.nombre,
                      1,
                      producto.descuento,
                      producto.imagen,
                      producto.precio,
                      producto.cantidad
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ListarProductos;
