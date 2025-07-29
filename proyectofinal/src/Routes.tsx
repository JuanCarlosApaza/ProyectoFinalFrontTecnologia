import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Pruebas from "./components/Pruebas";
import HomeCategorias from "./pages/categorias/HomeCategorias";
import ProdcutosCategorias from "./pages/productos/ProductosCategorias";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard";
import ActualizarProductos from "./pages/productos/ActualizarProductos";
import HomeEmpresas from "./pages/empresas/HomeEmpresas";
import ProdcutosEmpresas from "./pages/productos/ProductosEmpresas";
import Inicio from "./Inicio";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/crearproductos" element={<CrearProducto />} />
          <Route
            path="/editarproductos/:id"
            element={<ActualizarProductos />}
          />

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
          <Route
            path="/categorias/:columna/:id"
            element={<ProdcutosCategorias />}
          />

          <Route path="/listarcategorias" element={<ListarCategorias />} />
          <Route path="/homecategorias" element={<HomeCategorias />} />
          <Route
            path="/empresas/:columna/:id"
            element={<ProdcutosEmpresas />}
          />
          <Route path="/crearempresas" element={<CrearEmpresa />} />
          <Route path="/editarempresas/:id" element={<ActualizarEmpresas />} />
          <Route path="/homeempresas" element={<HomeEmpresas />} />

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
          <Route path="/pruebas" element={<Pruebas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default Rutas;
