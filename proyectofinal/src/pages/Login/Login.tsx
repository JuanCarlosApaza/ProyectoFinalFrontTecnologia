import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import chat from "../../assets/chat.png"; // ✅ importación correcta de imagen

const Login: React.FC = () => {
  const [formulario, setFormulario] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setButtonDisabled(!(formulario.email && formulario.password));
  }, [formulario]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formulario.email, formulario.password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Bienvenido",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "¡Algo salió mal!",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-xl rounded-lg overflow-hidden border border-gray-200">
        
        <div className="hidden md:block md:w-1/2">
          <img
            src={chat}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-center mb-10">
            Iniciar sesión en tu tienda
          </h2>

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formulario.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={buttonDisabled}
              className={`w-full py-3 font-semibold rounded-md transition-colors ${
                buttonDisabled
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Iniciar sesión
            </button>
          </form>

          <p className="text-center mt-10 text-base">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/crearusuario"
              className="text-blue-600 hover:underline font-semibold"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
