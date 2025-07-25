import { Link } from "react-router-dom";

interface BotonProps {
  link: string;
  name: string;
  color: string;
}

const Boton: React.FC<BotonProps> = ({ link, name, color }) => {
  return (
    <Link to={link}>
      <button className={`${color} px-4 py-2 rounded-md text-white border-2 border-amber-50 hover:bg-opacity-80 sm:w-auto`}>
        {name}
      </button>
    </Link>
  );
};

export default Boton;