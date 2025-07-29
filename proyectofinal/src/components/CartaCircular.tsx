import type React from "react";
import imagenref from "../assets/notfound.png";

interface cartaprops {
  imagen: string;
  titulo: string;
  fondo: string;
  colortexto: string;
}

const CartaCircular: React.FC<cartaprops> = ({
  imagen,
  titulo,
  fondo,
  colortexto,
}) => {
  return (
    <div
      className="w-52 flex flex-col items-center justify-center rounded-full py-4 shadow-md hover:shadow-lg transition-all duration-300"
      style={{ backgroundColor: fondo }}
    >
      <div className="w-36 h-36 rounded-full overflow-hidden group">
        <img
          src={imagen ? `http://127.0.0.1:8000/storage/${imagen}` : imagenref}
          alt="Imagen del producto"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h1
        className="mt-3 text-sm font-semibold text-center px-2 truncate"
        style={{ color: colortexto }}
      >
        {titulo}
      </h1>
    </div>
  );
};

export default CartaCircular;
