import { useState, type FormEvent } from "react";
import type { empresaForm } from "../../interfaces/Empresa";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";

const CrearEmpresa = () => {
  const [empresas, setEmpresas] = useState<empresaForm>({
    nombre: "",
    logo: null,
    direccion: "",
    telefono: "",
  });
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

    empresaForm.append("estado", "1");
    if (empresas.logo) {
      empresaForm.append("logo", empresas.logo);
    }
    await fetch("http://127.0.0.1:8000/api/empresas", {
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
export default CrearEmpresa;
