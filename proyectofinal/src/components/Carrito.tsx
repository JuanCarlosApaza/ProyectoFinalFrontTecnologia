import { useState } from "react";
import { useCarrito } from "../hooks/useCarrito";
import Modal from "./Modal";
import imagenref from "../assets/notfound.png";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";

const Carrito = () => {
  const { carrito, modificarCarrito, vaciarCarrito, venderCarrito } =
    useCarrito();
  const [open, setOpen] = useState(false);

  const total = carrito.reduce((acc, item) => {
    const precioConDescuento =
      item.descuento > 0
        ? item.precio - (item.precio * item.descuento) / 100
        : item.precio;

    return acc + precioConDescuento * item.cantidad;
  }, 0);

  return (
    <div className="p-6">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl shadow-md transition duration-200"
      >
        <FaShoppingCart className="text-xl animate-bounce" />
        <span>Carrito</span>
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Carrito de compras"
      >
        <div className="max-h-80 overflow-y-auto w-full">
          {carrito.length === 0 ? (
            <p className="text-gray-500 text-center">Tu carrito está vacío.</p>
          ) : (
            carrito.map((c) => {
              const precioFinal =
                c.descuento > 0
                  ? (c.precio - (c.precio * c.descuento) / 100) * c.cantidad
                  : c.precio * c.cantidad;

              return (
                <div
                  key={c.id}
                  className="w-full rounded-xl flex items-center gap-4 p-4 bg-white border border-gray-200 mb-4"
                >
                  <img
                    className="w-32 h-32 object-cover rounded-lg"
                    src={
                      c.imagen
                        ? `http://127.0.0.1:8000/storage/${c.imagen}`
                        : imagenref
                    }
                    alt={c.nombre}
                  />

                  <div className="flex-1 space-y-1 text-gray-800">
                    <h1 className="font-semibold text-lg">
                      Nombre: {c.nombre}
                    </h1>
                    <h2 className="text-sm">Precio unitario: {c.precio} Bs</h2>
                    <h2 className="text-sm">Cantidad: {c.cantidad}</h2>
                    <h2 className="text-sm">Descuento: {c.descuento}%</h2>
                    <h2 className="font-bold text-blue-700">
                      TOTAL: {precioFinal.toFixed(2)} Bs
                    </h2>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        modificarCarrito(
                          c.id,
                          c.cantidad,
                          "+",
                          c.cantidadproducto
                        )
                      }
                      className="text-green-600 hover:text-green-800"
                    >
                      <BiCaretUp size={24} />
                    </button>
                    <button
                      onClick={() =>
                        modificarCarrito(
                          c.id,
                          c.cantidad,
                          "-",
                          c.cantidadproducto
                        )
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <BiCaretDown size={24} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {carrito.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mt-6 border-t pt-4">
            <button
              onClick={() => vaciarCarrito()}
              className="text-white rounded-xl px-6 py-2 hover:bg-red-500 font-medium transition-colors bg-red-400"
            >
              Vaciar Carrito
            </button>

            <button
              onClick={() => venderCarrito()}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Total: {total.toFixed(2)} Bs – Pasar a Comprar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Carrito;
