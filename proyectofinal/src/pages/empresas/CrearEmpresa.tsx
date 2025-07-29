import { useState, type FormEvent } from "react";
import type { empresaForm } from "../../interfaces/Empresa";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";
import ColorPickerModal from "../../components/ModalColor";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CrearEmpresa = () => {
  const [empresas, setEmpresas] = useState<empresaForm>({
    nombre: "",
    logo: null,
    direccion: "",
    telefono: "",
    texto: "rgb(0, 0, 0)",
    fondo: "rgb(255, 255, 255)",
    id_usuario: 0,
  });
  const [imagen, setImagen] = useState<string | null>(null);
  const { user } = useAuth();
const navigate = useNavigate();
  const [modalTextoOpen, setModalTextoOpen] = useState(false);
  const [modalFondoOpen, setModalFondoOpen] = useState(false);
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
      const url = URL.createObjectURL(e.target.files?.[0]);
      setImagen(url);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const savedtoken = localStorage.getItem("token");

    const empresaForm = new FormData();
    empresaForm.append("nombre", empresas.nombre);
    empresaForm.append("direccion", empresas.direccion);
    empresaForm.append("telefono", empresas.telefono);
    empresaForm.append("fondo", empresas.fondo);
    empresaForm.append("texto", empresas.texto);
    empresaForm.append("estado", "Activo");
    empresaForm.append("id_usuario", String(user?.id));
    if (empresas.logo) {
      empresaForm.append("logo", empresas.logo);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/empresas/crear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${savedtoken}`,
        },
        body: empresaForm,
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
      navigate("/listarempresas");
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
          <div className="mb-4">
            <label className="block mb-1">Color de Fondo</label>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded border"
                style={{ backgroundColor: empresas.fondo }}
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
                style={{ backgroundColor: empresas.texto }}
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
              name="logo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg text-gray-800 bg-white file:bg-blue-900 file:text-white file:rounded-lg file:border-0 file:px-4 file:py-2 hover:file:bg-blue-800 transition duration-200"
            />
          </div>
          <div className="mb-6 w-full h-36">
            <div
              className=" rounded flex items-center p-4 justify-between w-full h-full"
              style={{ backgroundColor: empresas.fondo }}
            >
              <h1
                className="font-serif text-4xl"
                style={{
                  color: empresas.texto,
                }}
              >
                {empresas.nombre}
              </h1>

              {imagen && (
                <img src={imagen} className="w-32 h-28 rounded" alt="" />
              )}
            </div>
          </div>
          <div className="mb-4">
            <button className="bg-blue-700 text-white px-4 py-2 rounded" type="submit">
              enviar
            </button>
          </div>
        </form>
      </Formulario>

      <ColorPickerModal
        isOpen={modalTextoOpen}
        initialColor={empresas.texto}
        onClose={() => setModalTextoOpen(false)}
        onChange={(color: string) =>
          setEmpresas((prev) => ({ ...prev, texto: color }))
        }
        titulo="Color del Texto"
      />
      <ColorPickerModal
        isOpen={modalFondoOpen}
        initialColor={empresas.fondo}
        onClose={() => setModalFondoOpen(false)}
        onChange={(color: string) =>
          setEmpresas((prev) => ({ ...prev, fondo: color }))
        }
        titulo="Color de Fondo"
      />
    </>
  );
};
export default CrearEmpresa;
