import { useState, type FormEvent } from "react";
import type { CategoriaForm } from "../../interfaces/Categoria";
import InputField from "../../components/Input";
import Formulario from "../../components/Formulario";

const CrearCategorias = () => {
  const [categoria, setCategorias] = useState<CategoriaForm>({
    nombre: "",
    imagen: null,
  });
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
    await fetch("http://127.0.0.1:8000/api/categorias", {
      method: "POST",
      body: categoriaForm,
    });
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

          <button className="" type="submit">
            enviar
          </button>
        </form>
      </Formulario>
    </>
  );
};
export default CrearCategorias;
