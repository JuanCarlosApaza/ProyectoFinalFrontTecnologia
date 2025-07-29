import { SketchPicker, type ColorResult } from "react-color";

interface ColorPickerModalProps {
  isOpen: boolean;
  initialColor: string;
  onClose: () => void;
  onChange: (color: string) => void;
  titulo?: string;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  initialColor,
  onClose,
  onChange,
  titulo = "Selecciona un color",
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="bg-white rounded-lg p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
        <SketchPicker
          color={initialColor}
          onChange={(color: ColorResult) =>
            onChange(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`)
          }
        />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ColorPickerModal;
