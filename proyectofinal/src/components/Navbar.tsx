import { use, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaHome,
  FaFile,
  FaCartArrowDown,
  FaTable,
  FaBuilding,
  FaFilter,
  FaCreditCard,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen w-full bg-white flex overflow-hidden">
      <aside className="h-full w-56 flex flex-col space-y-6 items-center justify-center bg-gray-800 text-white py-6 px-4">
        <Link
          to="/"
          className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
        >
          <FaHome className="h-5 w-5" />
          <span className="text-sm">Inicio</span>
        </Link>

        <Link
          to="/listarproductos"
          className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
        >
          <FaCartArrowDown className="h-5 w-5" />
          <span className="text-sm">Productos</span>
        </Link>

        <Link
          to="/homeempresas"
          className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
        >
          <FaBuilding className="h-5 w-5" />
          <span className="text-sm">Empresas</span>
        </Link>

        <Link
          to="/homecategorias"
          className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
        >
          <FaFilter className="h-5 w-5" />
          <span className="text-sm">Categorías</span>
        </Link>
        {user && (
          <>
            <Link
              to="/listardetalles"
              className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
            >
              <FaTable className="h-5 w-5" />
              <span className="text-sm">Detalles</span>
            </Link>

            <Link
              to="/listarventas"
              className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
            >
              <FaCreditCard className="h-5 w-5" />
              <span className="text-sm">Ventas</span>
            </Link>

            <Link
              to="/listarusuarios"
              className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
            >
              <FaUsers className="h-5 w-5" />
              <span className="text-sm">Usuarios</span>
            </Link>

            <Link
              to="/listarpromociones"
              className="flex items-center gap-4 hover:text-gray-800 hover:bg-white rounded-lg px-2 py-2 transition-all w-full"
            >
              <FaFile className="h-5 w-5" />
              <span className="text-sm">Promociones</span>
            </Link>
          </>
        )}
      </aside>

      <div className="w-full h-full flex flex-col">
        <header className="h-16 w-full flex items-center justify-end px-5 bg-gray-800 text-white">
          {user ? (
            <div className="flex items-center gap-4  rounded px-4 py-2 shadow">
              <div className="text-right">
                <p className="text-sm text-white  font-medium">
                  Usuario: {user.name}
                </p>
                <p className="text-sm text-white">Rol: {user.role}</p>
              </div>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition"
              >
                Cerrar Sesión
              </button>

              {/* <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-blue-400" /> */}
            </div>
          ) : (
            <div className="flex items-center gap-4  rounded px-4 py-2 shadow">
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded transition">
                  Iniciar Sesión
                </button>
              </Link>
              <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-blue-400" />
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
