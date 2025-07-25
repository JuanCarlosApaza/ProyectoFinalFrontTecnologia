const Formulario: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-2xl border border-blue-900/10">
        {children}
      </div>
    </div>
  );
};

export default Formulario;
