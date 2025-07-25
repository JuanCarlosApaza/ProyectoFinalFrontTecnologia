import { useEffect, useState } from "react";
import type { producto } from "../../interfaces/Producto";
import NabvarCategorias from "../../components/ListarCategorias";
import Carta from "../../components/Carta";
import Imagen from "../../assets/notfound.png";
import Logo from "../../assets/react.svg";

const ListarProductos = () => {
  const [productos, setProductos] = useState<producto[]>([]);
  const [categoria, setcategoria] = useState();
  useEffect(() => {
    if (!categoria) {
      fetch("http://127.0.0.1:8000/api/productos")
        .then((res) => res.json())
        .then((data: producto[]) => setProductos(data));
    } else {
      fetch(`http://127.0.0.1:8000/api/productos/${categoria}`)
        .then((res) => res.json())
        .then((data: producto[]) => setProductos(data));
    }
  }, [categoria]);
  return (
    <>
      <div className="relative">
        <div className="w-[90%] mx-auto">
          <NabvarCategorias />
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
