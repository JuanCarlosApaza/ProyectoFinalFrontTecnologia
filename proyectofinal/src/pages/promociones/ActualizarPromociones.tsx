import { useEffect, useState, type FormEvent } from "react";
import Formulario from "../../components/Formulario";
import type {
  promociones,
  promocionesForm,
} from "../../interfaces/Promociones";
import ComboBox from "../../components/ComboBox";
import { useParams } from "react-router-dom";

const ActualizarPromociones = () => {
  const { id } = useParams();
  const [promocioness, setpromocioness] = useState<promocionesForm>({
    imagen: null,
    id_producto: 0,
  });
  const [imagenactual, setImagenActual] = useState<string | null>(null);
  useEffect(() => {
    const obtenerdatos = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/api/promociones/buscar/${id}`
      );
      const data: promociones = await res.json();
      setpromocioness({ id_producto: data.id_producto, imagen: null });
      setImagenActual(data.imagen);
    };
    if (id) {
      obtenerdatos();
    }
  }, [id]);
  const handleProductoChange = (id: number) => {
    setpromocioness((prev) => ({
      ...prev,
      id_producto: id,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setpromocioness((prev) => ({
        ...prev,
        imagen: e.target.files![0],
      }));
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const promocionesForm = new FormData();
    promocionesForm.append("id_producto", String(promocioness.id_producto));

    promocionesForm.append("estado", "1");
    if (promocioness.imagen) {
      promocionesForm.append("imagen", promocioness.imagen);
    }
    const response = await fetch(
      `http://127.0.0.1:8000/api/promociones/actualizar/${id}`,
      {
        method: "POST",
        body: promocionesForm,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al crear :", errorData);
      alert("Error al crear");
      return;
    }

    alert(" creado correctamente");
  };
  return (
    <>
      <Formulario>
        <form onSubmit={handleSubmit}>
          <ComboBox url="productos" onSelect={handleProductoChange} />
          {imagenactual && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Imagen actual:
              </label>
              <img
                src={`http://127.0.0.1:8000/storage/${imagenactual}`}
                alt="Imagen actual"
                className="w-32 h-32 object-cover border rounded"
              />
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="imagen"
              className="block text-sm font-semibold text-blue-900 mb-2"
            >
              Imagen:
            </label>
            <input
              id="imagen"
              type="file"
              name="imagen"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg text-gray-800 bg-white file:bg-blue-900 file:text-white file:rounded-lg file:border-0 file:px-4 file:py-2 hover:file:bg-blue-800 transition duration-200"
            />
          </div>

          <div className="mb-4">
            <button className="" type="submit">
              enviar
            </button>
          </div>
        </form>
      </Formulario>
    </>
  );
};
export default ActualizarPromociones;
