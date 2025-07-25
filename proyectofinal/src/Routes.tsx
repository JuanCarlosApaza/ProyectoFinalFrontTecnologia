import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ListarProductos from "./pages/productos/ListarProductos";
import CrearCategorias from "./pages/categorias/CrearCategorias";
import ListarCategorias from "./pages/categorias/ListarCategorias";
import Navbar from "./components/Navbar";
import ListarEmpresas from "./pages/empresas/ListarEmpresas";
import CrearEmpresa from "./pages/empresas/CrearEmpresa";
import CrearProducto from "./pages/productos/CrearProductos";
import ListarUsuarios from "./pages/usuarios/ListarUsuarios";
import Listarventass from "./pages/ventas/ListarVentas";
import Listardetalless from "./pages/detalles/ListarDetalles";
import ListarPromociones from "./pages/promociones/ListarPromociones";
import Crearusuarios from "./pages/usuarios/CrearUsuarios";
import Crearpromociones from "./pages/promociones/CrearPromociones";
import ActualizarCategoria from "./pages/categorias/ActualizarCategoria";
import ActualizarEmpresas from "./pages/empresas/ActualizarEmpresa";
import ActualizarPromociones from "./pages/promociones/ActualizarPromociones";
import Actualizarusuarios from "./pages/usuarios/ActualizarUsuarios";
import ListarproductosTablas from "./pages/productos/ListarTablasProductos";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<ListarProductos />} />
          <Route path="/crearproductos" element={<CrearProducto />} />
          <Route path="/listarproductos" element={<ListarProductos />} />
          <Route
            path="/listarproductostables"
            element={<ListarproductosTablas />}
          />

          <Route path="/crearcategoria" element={<CrearCategorias />} />
          <Route
            path="/editarcategoria/:id"
            element={<ActualizarCategoria />}
          />
          <Route path="/listarcategorias" element={<ListarCategorias />} />
          <Route path="/crearempresas" element={<CrearEmpresa />} />
          <Route path="/editarempresas/:id" element={<ActualizarEmpresas />} />

          <Route path="/listarempresas" element={<ListarEmpresas />} />
          <Route path="/crearusuario" element={<Crearusuarios />} />
          <Route path="/editarusuarios/:id" element={<Actualizarusuarios />} />

          <Route path="/listarusuarios" element={<ListarUsuarios />} />
          <Route path="/listarventas" element={<Listarventass />} />
          <Route path="/listardetalles" element={<Listardetalless />} />
          <Route path="/crearpromocion" element={<Crearpromociones />} />
          <Route
            path="/editarpromociones/:id"
            element={<ActualizarPromociones />}
          />
          <Route path="/listarpromociones" element={<ListarPromociones />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default Rutas;
