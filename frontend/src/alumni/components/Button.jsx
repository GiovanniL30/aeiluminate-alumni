import React from "react";

const Button = ({ text, variant = "filled", otherStyle, onClick, type = "button", disabled = false }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${
        variant == "filled" ? "bg-primary_blue text-white" : "border-[1px]  bg-none text-black"
      }  font-semibold py-2 px-4 text-sm hover-opacity rounded-md ${
        disabled ? "pointer-events-none opacity-50" : "pointer-events-auto "
      } ${otherStyle} `}
    >
      {text}
    </button>
  );
};

export default Button;
