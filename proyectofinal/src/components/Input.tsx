import React from "react";

interface InputFieldProps {
  type?: "text" | "number" | "email" | "password" | "file";
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isNumeric?: boolean; // nuevo campo opcional
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  isNumeric = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumeric) {
      const regex = /^(\d+(\.\d{0,2})?)?$/; 
      if (e.target.value === "" || regex.test(e.target.value)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-blue-900 mb-2"
      >
        {placeholder}
      </label>
      <input
        id={name}
        type={type === "number" ? "text" : type} 
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition duration-200 text-gray-800"
        inputMode={type === "number" || isNumeric ? "decimal" : undefined} 
      />
    </div>
  );
};

export default InputField;
