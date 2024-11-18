import React from "react";

const Input = ({ label, name, value, type = "text", handleChange, min = 8, otherStyle }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-light_text text-sm font-semibold"> {label}</label>

      <input
        required
        className={`w-full p-2 text-sm text-light_text border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue ${otherStyle}`}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        min={min}
      />
    </div>
  );
};

export default Input;
