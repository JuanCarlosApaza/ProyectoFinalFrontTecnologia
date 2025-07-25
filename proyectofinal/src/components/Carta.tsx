import type React from "react";
import { FaShoppingCart } from "react-icons/fa";
import imagenref from "../assets/notfound.png";
import logoref from "../assets/react.svg";

interface MostrarDatos {
  nombre: string;
  empresa: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  descuento: number;
  logo: string;
  empresalogo: string;
}

const Carta: React.FC<MostrarDatos> = ({
  nombre,
  empresa,
  categoria,
  precio,
  descripcion,
  imagen,
  descuento,
  logo,
  empresalogo,
}) => {
  return (
    <div className="card p-6 rounded-xl text-gray-700 font-sans shadow-xl bg-gradient-to-bl from-[#e0e4e5] to-[#f2f6f9] max-w-sm mx-auto">
      <div className="relative">
        <img
          className="rounded w-full h-64 object-cover"
          src={imagen ? `http://127.0.0.1:8000/storage/${imagen}` : imagenref}
          alt="Imagen del producto"
        />
        {descuento > 0 && (
          <div className="absolute top-3 right-3 rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">
            -{descuento}%
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <div className="relative group">
          <img
            src={
              empresalogo
                ? `http://127.0.0.1:8000/storage/${empresalogo}`
                : logoref
            }
            alt="Logo Empresa"
            className="w-16 h-16 object-contain border p-1 bg-white shadow-md"
          />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded">
            Empresa: {empresa}
          </div>
        </div>

        <div className="relative group">
          <img
            src={logo ? `http://127.0.0.1:8000/storage/${logo}` : logoref}
            alt="Logo Marca"
            className="w-16 h-16 object-contain border p-1 bg-white shadow-md"
          />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded">
            Categoría: {categoria}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center space-y-1">
        <h2 className="text-lg font-semibold">{nombre}</h2>
        <p className="text-sm text-gray-600">{descripcion}</p>
        <p className="text-blue-950 font-bold mt-2">Precio: {precio} Bs</p>
      </div>

      <div className="mt-5 flex justify-center">
        <button className="bg-blue-950 hover:bg-blue-800 transition text-white rounded-2xl px-6 py-3 flex items-center gap-2">
          Agregar al Carrito
          <FaShoppingCart className="animate-bounce text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Carta;
