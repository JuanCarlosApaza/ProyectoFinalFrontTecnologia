import { useState, type FormEvent } from "react";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";
import type { usuariosForm } from "../../interfaces/Usuarios";

const Crearusuarios = () => {
  const [usuarioss, setusuarioss] = useState<usuariosForm>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setusuarioss((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const usuariosForm = new FormData();
  usuariosForm.append("name", usuarioss.name);
  usuariosForm.append("email", usuarioss.email);
  usuariosForm.append("password", usuarioss.password);
  usuariosForm.append("password_confirmation", usuarioss.password); 

  const response = await fetch("http://127.0.0.1:8000/api/usuarios/crear", {
    method: "POST",
    body: usuariosForm,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error al crear usuario:", errorData);
    alert("Error al crear usuario");
    return;
  }

  alert("Usuario creado correctamente");
};
  return (
    <>
      <Formulario>
        <form onSubmit={handleSubmit}>
          <InputField
            name="name"
            placeholder="Nombre"
            value={usuarioss.name}
            onChange={handleChange}
            required
          />
          <InputField
            name="email"
            type="email"
            placeholder="Correo"
            value={usuarioss.email}
            onChange={handleChange}
            required
          />
          <InputField
            name="password"
            type="password"
            placeholder="Clave"
            value={usuarioss.password}
            onChange={handleChange}
            required
          />
          

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
export default Crearusuarios;
