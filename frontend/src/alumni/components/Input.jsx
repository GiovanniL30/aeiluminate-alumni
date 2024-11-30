import React from "react";

const Input = ({ label, placeholder, name, value, type = "text", handleChange, min = 1, otherStyle }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-light_text text-sm font-semibold">{label}</label>

      {type === "textarea" ? (
        <textarea
          required
          className={` resize-none w-full p-2 text-sm text-light_text border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue ${otherStyle}`}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          required
          className={`w-full p-2 text-sm text-light_text border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue ${otherStyle}`}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          minLength={min}
          min={min}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
