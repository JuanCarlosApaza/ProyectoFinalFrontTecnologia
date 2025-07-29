import { useEffect, useState } from "react";
import type { producto } from "../../interfaces/Producto";
import { useParams } from "react-router-dom";
import Carta from "../../components/Carta";
import { useCarrito } from "../../hooks/useCarrito";
import Carrito from "../../components/Carrito";
import FondoColor from "../../components/FondoColor";
import Swal from "sweetalert2";

const ProdcutosCategorias = () => {
  const [productos, setProductos] = useState<producto[]>([]);
  const { agregarProducto } = useCarrito();

  const { id, columna } = useParams();
  const listar = async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/productos/filtrar/${columna}/${id}`);

    if (!res.ok) {
      const errorData = await res.json();
      const mensajes = errorData.message || "Error desconocido al obtener productos.";
      throw new Error(mensajes);
    }

    const data: producto[] = await res.json();
    setProductos(data);

  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar productos",
      text: error.message || "Ocurrió un error inesperado.",
    });
  }
};

  useEffect(() => {
    listar();
  }, []);
  return (
    <>
      <div className="relative">
        <div className="w-[90%] mx-auto">
          {productos.length > 0 && (
            <FondoColor
              fondo={productos[0].categoria.fondo}
              texto={productos[0].categoria.texto}
              nombre={productos[0].categoria.nombre}
              imagen={productos[0].categoria.imagen}
            />
          )}
          <Carrito />
          <div className="grid grid-cols-4 gap-4">
            {productos.map((producto) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProdcutosCategorias;
