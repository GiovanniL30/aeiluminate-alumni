import React, { useState } from "react";

const Input = ({ label, placeholder, name, value, type = "text", handleChange, min = 1, otherStyle, disabled, required = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-light_text font-semibold">{label}</label>

      <div className="relative w-full">
        {type === "textarea" ? (
          <textarea
            disabled={disabled}
            required={required}
            className={`resize-none w-full p-2 text-sm text-light_text border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue ${otherStyle}`}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        ) : (
          <>
            <input
              disabled={disabled}
              required={required}
              className={`w-full p-2 text-sm  border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue ${otherStyle}`}
              type={isPasswordField && showPassword ? "text" : type}
              name={name}
              value={value}
              onChange={handleChange}
              minLength={min}
              min={min}
              placeholder={placeholder}
            />
            {isPasswordField && (
              <button
                disabled={disabled}
                type="button"
                className="hover-opacity absolute top-2.5 right-2 text-xs text-primary_blue font-semibold"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
