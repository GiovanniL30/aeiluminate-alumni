import React from "react";

const Input = ({
  label,
  name,
  value,
  type = "text",
  options = null,
  handleChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-light_text text-sm font-semibold"> {label}</label>
      {options ? (
        <select
          className="w-full p-2 text-light_text border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue"
          name={name}
          onChange={handleChange}
          value={value}
        >
          {options.map((option, index) => (
            <option className="rounded-sm" key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      ) : (
        <input
          required
          className="w-full p-2 text-sm text-light_text border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue"
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default Input;
