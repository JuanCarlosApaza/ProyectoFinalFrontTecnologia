import { useEffect, useState, type FormEvent } from "react";
import type { producto, productoForm } from "../../interfaces/Producto";
import { useNavigate, useParams } from "react-router-dom";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";
import ComboBox from "../../components/ComboBox";
import Swal from "sweetalert2";

const ActualizarProductos = () => {
  const [imagenActual, setImagenActual] = useState<string | null>(null);
  const [empresas, setEmpresas] = useState<string>("");
  const [categorias, setCategorias] = useState<string>("");
  const navigate = useNavigate();

  const [productos, setProductos] = useState<productoForm>({
    nombre: "",
    id_empresa: 0,
    id_categoria: 0,
    precio: 0,
    cantidad: 0,
    descripcion: "",
    imagen: null,
    descuento: 0,
    estado: "stock", // agregamos el estado aquí
  });
  const { id } = useParams();
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/productos/buscar/${id}`
        );
        const data: producto = await res.json();
        setProductos({
          nombre: data.nombre,
          id_empresa: data.id_empresa,
          id_categoria: data.id_categoria,
          precio: data.precio,
          cantidad: data.cantidad,
          descripcion: data.descripcion,
          descuento: data.descuento,
          imagen: null,
          estado: data.estado || "stock", // asignamos estado del backend si existe
        });
        setImagenActual(data.imagen);
        setEmpresas(data.empresa.nombre);
        setCategorias(data.categoria.nombre);
      } catch (error) {
        console.error("Error cargando categoría:", error);
      }
    };

    if (id) obtenerDatos();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProductos((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductos((prev) => ({
        ...prev,
        imagen: e.target.files![0],
      }));
    }
  };
  const handleCategoriaChange = (id: number) => {
    setProductos((prev) => ({
      ...prev,
      id_categoria: id,
    }));
  };

  const handleEmpresaChange = (id: number) => {
    setProductos((prev) => ({
      ...prev,
      id_empresa: id,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const savedtoken = localStorage.getItem("token");

    const productoForm = new FormData();

    productoForm.append("nombre", productos.nombre);
    productoForm.append("id_empresa", String(productos.id_empresa));
    productoForm.append("id_categoria", String(productos.id_categoria));
    productoForm.append("precio", String(productos.precio));
    productoForm.append("cantidad", String(productos.cantidad));
    productoForm.append("descripcion", productos.descripcion);
    productoForm.append("descuento", String(productos.descuento));
    productoForm.append("estado", productos.estado); // enviamos el estado

    if (productos.imagen) {
      productoForm.append("imagen", productos.imagen);
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/productos/actualizar/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${savedtoken}`,
          },
          body: productoForm,
        }
      );

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
        text: "Producto actualizado correctamente.",
      });
      navigate("/listarproductostables");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.message || "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <Formulario>
      <form onSubmit={handleSubmit}>
        <InputField
          name="nombre"
          placeholder="Nombre"
          value={productos.nombre}
          onChange={handleChange}
          required
        />
        <InputField
          name="precio"
          placeholder="Precio"
          value={productos.precio}
          onChange={handleChange}
          isNumeric
          required
        />
        <InputField
          name="cantidad"
          placeholder="Cantidad"
          value={productos.cantidad}
          onChange={handleChange}
          required
        />
        <InputField
          name="descripcion"
          placeholder="Descripcion"
          value={productos.descripcion}
          onChange={handleChange}
          required
        />
        <InputField
          name="descuento"
          placeholder="Descuento"
          value={productos.descuento}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label htmlFor="">Categoria Actual : {categorias}</label>
          <ComboBox url="categorias" onSelect={handleCategoriaChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="">Empresa Actual : {empresas}</label>
          <ComboBox url="empresas" onSelect={handleEmpresaChange} />
        </div>

        <div className="mb-6">
          <label
            htmlFor="estado"
            className="block text-sm font-semibold text-blue-900 mb-2"
          >
            Estado:
          </label>
          <select
            id="estado"
            name="estado"
            value={productos.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-white text-gray-800"
          >
            <option value="stock">Stock</option>
            <option value="vencido">Vencido</option>
            <option value="agotado">Agotado</option>
          </select>
        </div>

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
            name="imagen"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg text-gray-800 bg-white file:bg-blue-900 file:text-white file:rounded-lg file:border-0 file:px-4 file:py-2 hover:file:bg-blue-800 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </Formulario>
  );
};

export default ActualizarProductos;
