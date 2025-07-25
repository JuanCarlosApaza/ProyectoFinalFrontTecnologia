interface ListaProps {
  items: string[];
  children:React.ReactNode,
}
const Tablas: React.FC<ListaProps> = ({ items,children}) => {
  return (
    <div>
      <table className="table-auto border-collapse w-full ">
        <thead className="bg-black  text-white ">
          <tr>
            {items.map((item, index) => (
              <th key={index} className="p-4 border-2 border-white">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
                {children}
        </tbody>
      </table>
    </div>
  );
};
export default Tablas;