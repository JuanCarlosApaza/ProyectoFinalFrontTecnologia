import { useState, type FormEvent } from "react";
import type { CategoriaForm } from "../../interfaces/Categoria";
import InputField from "../../components/Input";
import Formulario from "../../components/Formulario";
import ColorPickerModal from "../../components/ModalColor";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CrearCategorias = () => {
  const [categoria, setCategorias] = useState<CategoriaForm>({
    nombre: "",
    texto: "rgb(0, 0, 0)",
    fondo: "rgb(255, 255, 255)",
    imagen: null,
  });
  const navigate = useNavigate();

  const [imagen, setImagen] = useState<string | null>(null);

  const [modalTextoOpen, setModalTextoOpen] = useState(false);
  const [modalFondoOpen, setModalFondoOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategorias((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategorias((prev) => ({
        ...prev,
        imagen: e.target.files![0],
      }));
      const url = URL.createObjectURL(e.target.files?.[0]);
      setImagen(url);
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
      const res = await fetch("http://127.0.0.1:8000/api/categorias", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${savedtoken}`,
        },
        body: categoriaForm,
      });

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
        text: "Categoría registrada correctamente.",
      });
            navigate("/listarcategorias");

    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
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
            <label htmlFor="imagen" className="block font-semibold mb-1">
              Imagen:
            </label>
            <input
              id="imagen"
              type="file"
              name="imagen"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg"
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

              {imagen && (
                <img src={imagen} className="w-32 h-28 rounded" alt="" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            Enviar
          </button>
        </form>
      </Formulario>

      <ColorPickerModal
        isOpen={modalTextoOpen}
        initialColor={categoria.texto}
        onClose={() => setModalTextoOpen(false)}
        onChange={(color: string) =>
          setCategorias((prev) => ({ ...prev, texto: color }))
        }
        titulo="Color del Texto"
      />
      <ColorPickerModal
        isOpen={modalFondoOpen}
        initialColor={categoria.fondo}
        onClose={() => setModalFondoOpen(false)}
        onChange={(color: string) =>
          setCategorias((prev) => ({ ...prev, fondo: color }))
        }
        titulo="Color de Fondo"
      />
    </>
  );
};

export default CrearCategorias;
