import { useEffect, useState, type FormEvent } from "react";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";
import type { usuarios, usuariosForm } from "../../interfaces/Usuarios";
import { useParams } from "react-router-dom";

const Actualizarusuarios = () => {
  const { id } = useParams();
  const [usuarioss, setusuarioss] = useState<usuariosForm>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const obtenerdatos = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/usuarios/buscar/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el usuario");
        const data: usuarios = await res.json();
        setusuarioss({ name: data.name, email: data.email, password: "" });
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        alert("Error al obtener los datos del usuario");
      }
    };

    if (id) {
      obtenerdatos();
    }
  }, [id]);

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
    usuariosForm.append("_method", "PUT"); 
    usuariosForm.append("name", usuarioss.name);
    usuariosForm.append("email", usuarioss.email);
    usuariosForm.append("password", usuarioss.password);
    usuariosForm.append("password_confirmation", usuarioss.password); 

    const response = await fetch(`http://127.0.0.1:8000/api/usuarios/actualizar/${id}`, {
      method: "POST", 
      body: usuariosForm,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al actualizar usuario:", errorData);
      alert("Error al actualizar usuario");
      return;
    }

    alert("Usuario actualizado correctamente");
  };

  return (
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
          <button type="submit">Enviar</button>
        </div>
      </form>
    </Formulario>
  );
};

export default Actualizarusuarios;
