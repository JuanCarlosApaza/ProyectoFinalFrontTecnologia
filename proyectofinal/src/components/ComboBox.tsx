import { useEffect, useState } from "react";
interface ComboProps {
  url: string;
  onSelect: (id: number) => void; // ← nuevo
}
interface opciones {
  id: number;
  nombre: string;
}
const ComboBox: React.FC<ComboProps> = ({ url, onSelect }) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number>(0);
  const [opciones, setOpciones] = useState<opciones[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/${url}`)
      .then((res) => res.json())
      .then((data: opciones[]) => setOpciones(data));
  }, [url]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setOpcionSeleccionada(value);
    onSelect(value); // ← notificar al padre
  };

  return (
    <div className="flex flex-col items-start w-full mb-6">
      <label
        htmlFor="espacio"
        className="mb-2 text-sm font-semibold text-blue-900"
      >
        Selecciona una opción:
      </label>
      <select
        id="espacio"
        value={opcionSeleccionada}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition duration-200"
      >
        <option value={0} disabled>
          -- Selecciona una opción --
        </option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ComboBox;