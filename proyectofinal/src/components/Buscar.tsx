import { useState, type FormEvent, useEffect } from "react";

interface buscarProps {
  Buscar: (buscado: string) => void;
}

const Buscar: React.FC<buscarProps> = ({ Buscar }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    Buscar(input.trim());
  };

  useEffect(() => {
    if (input.trim() === "") {
      Buscar("");
    }
  }, [input]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-white shadow-md rounded-xl w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Buscar..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </form>
  );
};

export default Buscar;
