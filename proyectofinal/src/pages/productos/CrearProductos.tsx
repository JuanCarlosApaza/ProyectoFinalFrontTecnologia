import { useState, type FormEvent } from "react";
import Formulario from "../../components/Formulario";
import InputField from "../../components/Input";
import type { productoForm } from "../../interfaces/Producto";
import ComboBox from "../../components/ComboBox";

const CrearProducto = () => {
  const [productos, setProductos] = useState<productoForm>({
    nombre: "",
    id_empresa: 0,
    id_categoria: 0,
    precio: 0,
    cantidad: 0,
    descripcion: "",
    imagen: null,
    descuento: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const productoForm = new FormData();

    productoForm.append("nombre", productos.nombre);
    productoForm.append("id_empresa", String(productos.id_empresa));
    productoForm.append("id_categoria", String(productos.id_categoria));
    productoForm.append("precio", String(productos.precio));
    productoForm.append("cantidad", String(productos.cantidad));
    productoForm.append("descripcion", productos.descripcion);
    productoForm.append("descuento", String(productos.descuento));
    productoForm.append("estado", "stock"); 

    if (productos.imagen) {
      productoForm.append("imagen", productos.imagen);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/productos", {
        method: "POST",
        body: productoForm,
      });
      if (res.ok) {
        alert("Producto creado correctamente");
      } else {
        alert("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error al enviar producto:", error);
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
        <ComboBox url="categorias" onSelect={handleCategoriaChange} />
        <ComboBox url="empresas" onSelect={handleEmpresaChange} />

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

export default CrearProducto;
