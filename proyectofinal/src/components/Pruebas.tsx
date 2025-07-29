import { useState } from "react";
import { SketchPicker } from "react-color";
import type { ColorResult } from "react-color";

const Pruebas = () => {
  const [colorFondo, setColorFondo] = useState("rgb(34,197,94)");
  const [colorTexto, setColorTexto] = useState("rgb(0,0,0)");
  const [imagen, setImagen] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagen(url);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block mb-1">Color de Fondo</label>
        <SketchPicker
          color={colorFondo}
          onChange={(color: ColorResult) =>
            setColorFondo(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`)
          }
        />
      </div>

      <div>
        <label className="block mb-1">Color del Texto</label>
        <SketchPicker
          color={colorTexto}
          onChange={(color: ColorResult) =>
            setColorTexto(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`)
          }
        />
      </div>

      <div>
        <label className="block mb-1">Seleccionar Imagen</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagen && (
          <img src={imagen} alt="Vista previa" className="mt-2 w-48 h-32 object-cover rounded" />
        )}
      </div>

      <div
        className="w-48 h-32 flex items-center justify-center rounded shadow"
        style={{ backgroundColor: colorFondo }}
      >
        <h1 style={{ color: colorTexto }}>HOLA MUNDO</h1>
      </div>
    </div>
  );
};

export default Pruebas;
