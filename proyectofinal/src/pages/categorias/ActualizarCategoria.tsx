import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { categoria, CategoriaForm } from "../../interfaces/Categoria";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";
import ColorPickerModal from "../../components/ModalColor";
import Swal from "sweetalert2";

const ActualizarCategoria = () => {
  const { id } = useParams();
    const navigate = useNavigate();

  const [categoria, setCategoria] = useState<CategoriaForm>({
    imagen: null,
    nombre: "",
    texto: "",
    fondo: "",
  });
  const [imagen, setImagen] = useState<string | null>(null);
  const [imagen2, setImagen2] = useState<string | null>(null);

  const [modalTextoOpen, setModalTextoOpen] = useState(false);
  const [modalFondoOpen, setModalFondoOpen] = useState(false);
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/categorias/buscar/${id}`
        );
        const data: categoria = await res.json();
        setCategoria({
          nombre: data.nombre,
          imagen: null,
          texto: data.texto,
          fondo: data.fondo,
        });
        setImagen(data.imagen);
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
      const url = URL.createObjectURL(e.target.files?.[0]);
      setImagen2(url);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const savedtoken = localStorage.getItem("token");

    const categoriaForm = new FormData();
    categoriaForm.append("nombre", categoria.nombre);
    categoriaForm.append("estado", "1");
    categoriaForm.append("fondo", categoria.fondo);
    categoriaForm.append("texto", categoria.texto);
    if (categoria.imagen) {
      categoriaForm.append("imagen", categoria.imagen);
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/categorias/actualizar/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${savedtoken}`,
          },
          body: categoriaForm,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.errors) {
          const mensajes = Object.values(errorData.errors).flat().join("\n");
          throw new Error(mensajes);
        } else {
          throw new Error(errorData.message || "Error desconocido");
        }
      }

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Categoría actualizada correctamente.",
      });
      navigate("/listarcategorias");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.message || "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <>
      <Formulario>
        <form onSubmit={handleSubmit}>
          <InputField
            name="nombre"
            placeholder="Nombre"
            value={categoria.nombre}
            onChange={handleChange}
            required
          />

          <div className="mb-4">
            <label className="block mb-1">Color de Fondo</label>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded border"
                style={{ backgroundColor: categoria.fondo }}
              ></div>
              <button
                type="button"
                onClick={() => setModalFondoOpen(true)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
              >
                Elegir color
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Color de Texto</label>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded border"
                style={{ backgroundColor: categoria.texto }}
              ></div>
              <button
                type="button"
                onClick={() => setModalTextoOpen(true)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
              >
                Elegir color
              </button>
            </div>
          </div>
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
          <div className="mb-6 w-full h-36">
            <div
              className=" rounded flex items-center p-4 justify-between w-full h-full"
              style={{ backgroundColor: categoria.fondo }}
            >
              <h1
                className="font-serif text-4xl"
                style={{
                  color: categoria.texto,
                }}
              >
                {categoria.nombre}
              </h1>

              {imagen2 ? (
                <img src={imagen2} className="w-32 h-28 rounded" alt="" />
              ) : (
                <img
                  src={`http://127.0.0.1:8000/storage/${imagen}`}
                  className="w-32 h-28 rounded"
                  alt=""
                />
              )}
            </div>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            type="submit"
          >
            Actualizar
          </button>
        </form>
      </Formulario>
      <ColorPickerModal
        isOpen={modalTextoOpen}
        initialColor={categoria.texto}
        onClose={() => setModalTextoOpen(false)}
        onChange={(color: string) =>
          setCategoria((prev) => ({ ...prev, texto: color }))
        }
        titulo="Color del Texto"
      />
      <ColorPickerModal
        isOpen={modalFondoOpen}
        initialColor={categoria.fondo}
        onClose={() => setModalFondoOpen(false)}
        onChange={(color: string) =>
          setCategoria((prev) => ({ ...prev, fondo: color }))
        }
        titulo="Color de Fondo"
      />
    </>
  );
};

export default ActualizarCategoria;
