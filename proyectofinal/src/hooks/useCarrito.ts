import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
export const useCarrito = ()=>{
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("usecarrito debe usarse dentro de carrito provieder");
        
    }
    return context;
}
