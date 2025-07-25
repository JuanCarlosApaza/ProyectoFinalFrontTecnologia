import { useEffect, useState, type FormEvent } from "react";
import type { empresa, empresaForm } from "../../interfaces/Empresa";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";
import { useParams } from "react-router-dom";

const ActualizarEmpresas = () => {
  const { id } = useParams();
  const [empresas, setEmpresas] = useState<empresaForm>({
    nombre: "",
    logo: null,
    direccion: "",
    telefono: "",
  });
  const [imagenActual, setImagenActual] = useState<string | null>(null);
  useEffect(() => {
    const obtenerdatos = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/empresas/buscar/${id}`
        );
        const data: empresa = await res.json();
        setEmpresas({
          nombre: data.nombre,
          logo: null,
          direccion: data.direccion,
          telefono: data.telefono,
        });
        setImagenActual(data.logo);
      } catch (error) {
        console.error("error", error);
      }
    };
    if (id) {
      obtenerdatos();
    }
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresas((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEmpresas((prev) => ({
        ...prev,
        logo: e.target.files![0],
      }));
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const empresaForm = new FormData();
    empresaForm.append("nombre", empresas.nombre);
    empresaForm.append("direccion", empresas.direccion);
    empresaForm.append("telefono", empresas.telefono);

    empresaForm.append("estado", "activo");
    if (empresas.logo) {
      empresaForm.append("logo", empresas.logo);
    }
    await fetch(`http://127.0.0.1:8000/api/empresas/actualizar/${id}`, {
      method: "POST",
      body: empresaForm,
    });
  };
  return (
    <>
      <Formulario>
        <form onSubmit={handleSubmit}>
          <InputField
            name="nombre"
            placeholder="Nombre"
            value={empresas.nombre}
            onChange={handleChange}
            required
          />
          <InputField
            name="direccion"
            placeholder="Direccion"
            value={empresas.direccion}
            onChange={handleChange}
            required
          />
          <InputField
            name="telefono"
            placeholder="Telefono"
            value={empresas.telefono}
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
              Imagen:
            </label>
            <input
              id="imagen"
              type="file"
              name="logo"
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
export default ActualizarEmpresas;
