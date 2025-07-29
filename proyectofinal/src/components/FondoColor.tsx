interface fondoprops {
  fondo: string;
  texto: string;
  nombre: string;
  imagen: string;
}

const FondoColor: React.FC<fondoprops> = ({
  fondo,
  texto,
  nombre,
  imagen,
}) => {
  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between w-full h-36 rounded-xl p-6 shadow-md"
        style={{ backgroundColor: fondo }}
      >
        {/* Texto a la izquierda */}
        <h1
          className="font-serif text-4xl font-bold truncate"
          style={{ color: texto }}
        >
          {nombre}
        </h1>

        {/* Imagen a la derecha */}
        {imagen && (
          <img
            src={`http://127.0.0.1:8000/storage/${imagen}`}
            className="w-32 h-28 object-cover rounded-lg shadow"
            alt={nombre}
          />
        )}
      </div>
    </div>
  );
};

export default FondoColor;
