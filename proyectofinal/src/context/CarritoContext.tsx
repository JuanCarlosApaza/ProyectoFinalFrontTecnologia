import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
interface ItemCarrito {
  id: number;
  nombre: string;
  cantidad: number;
  descuento: number;
  imagen: string;
  precio: number;
  cantidadproducto: number;
}
interface CarritoContextProps {
  carrito: ItemCarrito[];
  agregarProducto: (
    id: number,
    nombre: string,
    cantidad: number,
    descuento: number,
    imagen: string,
    precio: number,
    cantidadproducto: number
  ) => void;
  modificarCarrito: (
    id: number,
    cantidad: number,
    accion: string,
    cantidadproducto: number
  ) => void;
  vaciarCarrito: () => void;
  venderCarrito: () => void;
}
export const CarritoContext = createContext<CarritoContextProps | undefined>(
  undefined
);
export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarProducto = (
    id: number,
    nombre: string,
    cantidad: number,
    descuento: number,
    imagen: string,
    precio: number,
    cantidadproducto: number
  ) => {
    const existe = carrito.find((item) => item.id === id);
    if (existe) {
      return;
    }
    const nuevo = {
      id,
      nombre,
      cantidad,
      descuento,
      imagen,
      precio,
      cantidadproducto,
    };
    setCarrito([...carrito, nuevo]);
  };

  const modificarCarrito = (
    id: number,
    cantidad: number,
    accion: string,
    cantidadproducto: number
  ) => {
    if (accion === "+" && cantidad < cantidadproducto) {
      const actualizado = carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(actualizado);
    } else if (accion === "-" && cantidad > 1) {
      const actualizado = carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      );
      setCarrito(actualizado);
    } else if (cantidad <= 1) {
      const actualizado = carrito.filter((item) => item.id !== id);
      setCarrito(actualizado);
    }
  };
  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const venderCarrito = async () => {
    const savedtoken = localStorage.getItem("token");

    try {
      const ventaConDetalles = {
        metodo_pago: "QR",
        estado: "Pagado",
        id_usuario: 1,
        total: carrito.reduce((acc, item) => {
          const precioConDescuento =
            item.descuento > 0
              ? item.precio - (item.precio * item.descuento) / 100
              : item.precio;
          return acc + precioConDescuento * item.cantidad;
        }, 0),
        detalles: carrito.map((item) => ({
          id_producto: item.id,
          descuento: item.descuento,
          cantidad: item.cantidad,
          estado: "Registrado",
        })),
      };

      const res = await fetch("http://127.0.0.1:8000/api/ventas/completa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedtoken}`,
        },
        body: JSON.stringify(ventaConDetalles),
      });

      const data = await res.json(); // 👈 esto debe ir antes del res.ok para capturar errores también

      if (!res.ok) {
        if (data.errors) {
          const mensajes = Object.values(data.errors).flat().join("\n");
          throw new Error(mensajes);
        } else {
          throw new Error(data.message || "Error desconocido");
        }
      }

      setCarrito([]); // vaciar el carrito solo si todo va bien

      Swal.fire({
        icon: "success",
        title: "Venta realizada",
        text: "La venta se registró correctamente.",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al vender",
        text: error.message || "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        modificarCarrito,
        vaciarCarrito,
        venderCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
