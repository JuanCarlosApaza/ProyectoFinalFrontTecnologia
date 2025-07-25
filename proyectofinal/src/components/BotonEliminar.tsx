import React from "react";

interface AccionProps {
  url: string;
  id: string;
  accion: (verificar: boolean) => void;
}

const BotonEliminar: React.FC<AccionProps> = ({ url, id, accion }) => {
  const eliminar = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/${url}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      accion(true); 
    } else {
      accion(false); 
    }
  };

  return (
    <button
      onClick={eliminar}
      className="bg-red-600 hover:bg-red-900 p-2 text-white rounded"
    >
      Eliminar
    </button>
  );
};

export default BotonEliminar;
