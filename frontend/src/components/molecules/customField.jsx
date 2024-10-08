import { useState } from "react";

export default function CustomField({
  label,
  type,
  name,
  pattern,
  options,
  value,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (val) => {
    setSelectedValue(val);
    setIsOpen(false);
    onChange({
      target: {
        name,
        value: val,
      },
    });
  };

  return (
    <label
      className="  flex items-start gap-2 text-gray-500 font-semibold flex-col text-secondary"
      htmlFor={name}
    >
      {label}
      {options && options.length > 0 ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 w-full text-left  border-gray rounded-xl focus:outline-none bg-gray-100 focus:bg-gray-200  flex justify-between items-center"
          >
            <span>
              {selectedValue
                ? options.find((option) => option.code === selectedValue)
                    ?.title ||
                  options.find((option) => option.method_code === selectedValue)
                    ?.method_title
                : "Select an option"}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute z-10 w-full mt-2 bg-white border-gray rounded-xl max-h-60 overflow-auto shadow-lg">
              {options.map((option) => (
                <li
                  key={option.code || option.method_code}
                  onClick={() =>
                    handleChange(option.code || option.method_code)
                  }
                  className="p-3 hover:bg-gray-200 cursor-pointer"
                >
                  {option.title || option.method_title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <input
          required={true}
          type={type}
          name={name}
          pattern={pattern}
          value={value}
          onChange={onChange}
          className="p-3 focus:outline-none  font-normal rounded-xl bg-gray-100 focus:bg-gray-200 "
        />
      )}
    </label>
  );
}
