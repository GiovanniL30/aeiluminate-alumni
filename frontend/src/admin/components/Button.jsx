import React from "react";

const Button = ({ text, variant = "filled", otherStyle, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        variant == "filled"
          ? "bg-primary_blue text-white"
          : "border-[1px]  bg-gray-100 text-black"
      }  font-semibold py-2 px-4 text-sm hover-opacity rounded-md ${otherStyle} `}
    >
      {text}
    </button>
  );
};

export default Button;
