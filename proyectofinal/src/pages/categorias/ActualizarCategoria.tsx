import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import type { categoria, CategoriaForm } from "../../interfaces/Categoria";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";

const ActualizarCategoria = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState<CategoriaForm>({
    imagen: null,
    nombre: "",
  });
  const [imagenActual, setImagenActual] = useState<string | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/categorias/buscar/${id}`);
        const data: categoria = await res.json();
        setCategoria({ nombre: data.nombre, imagen: null });
        setImagenActual(data.imagen);
      } catch (error) {
        console.error("Error cargando categoría:", error);
      }
    };

    if (id) obtenerDatos();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategoria((prev) => ({
        ...prev,
        imagen: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const categoriaForm = new FormData();
    categoriaForm.append("nombre", categoria.nombre);
    categoriaForm.append("estado", "1"); 
    if (categoria.imagen) {
      categoriaForm.append("imagen", categoria.imagen);
    }

    const res = await fetch(
      `http://127.0.0.1:8000/api/categorias/actualizar/${id}`,
      {
        method: "POST", 
        body: categoriaForm,
      }
    );

    if (res.ok) {
      alert("Categoría actualizada correctamente");
    } else {
      alert("Hubo un error al actualizar la categoría");
    }
  };

  return (
    <Formulario>
      <form onSubmit={handleSubmit}>
        <InputField
          name="nombre"
          placeholder="Nombre"
          value={categoria.nombre}
          onChange={handleChange}
          required
        />

        {imagenActual && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Imagen actual:
            </label>
            <img
              src={`http://127.0.0.1:8000/storage/${imagenActual}`}
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
            Nueva imagen (opcional):
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

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Actualizar
        </button>
      </form>
    </Formulario>
  );
};

export default ActualizarCategoria;
