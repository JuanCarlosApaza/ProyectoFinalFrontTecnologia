import type { ReactNode } from "react";
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

const Navbar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full bg-white flex overflow-hidden">
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center bg-gray-800 text-white py-4">
        <Link
          to="/"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaHome className="h-5 w-5" />
        </Link>

        <Link
          to="/listarproductostables"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaCartArrowDown className="h-5 w-5" />
        </Link>

        <Link
          to="/listarempresas"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaBuilding className="h-5 w-5" />
        </Link>
        <Link
          to="/listarcategorias"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaFilter className="h-5 w-5" />
        </Link>
        <Link
          to="/listardetalles"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaTable className="h-5 w-5" />
        </Link>
        <Link
          to="/listarventas"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaCreditCard className="h-5 w-5" />
        </Link>
        <Link
          to="/listarusuarios"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaUsers className="h-5 w-5" />
        </Link>
        <Link
          to="/listarpromociones"
          className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white transition-all duration-300"
        >
          <FaFile className="h-5 w-5" />
        </Link>
      </aside>

      <div className="w-full h-full flex flex-col">
        <header className="h-16 w-full flex items-center justify-end px-5 space-x-4 bg-gray-800 text-white">
          <div className="flex flex-col items-end">
            <div className="text-md font-medium">desconocido desconocido</div>
            <div className="text-sm">Estudiante</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-blue-400" />
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
