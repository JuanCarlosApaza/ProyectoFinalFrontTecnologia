import React from "react";
import Swal from "sweetalert2";

interface AccionProps {
  url: string;
  id: string;
  accion: (verificar: boolean) => void;
}

const BotonEliminar: React.FC<AccionProps> = ({ url, id, accion }) => {
  const eliminar = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      accion(true);
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El registro fue eliminado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al eliminar");
    }
  } catch (error: any) {
    accion(false);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Ocurrió un error al eliminar.",
    });
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
