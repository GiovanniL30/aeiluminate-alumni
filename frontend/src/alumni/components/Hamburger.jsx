import React from "react";

const Hamburger = ({ isOpen = false, otherStyle, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col justify-between  items-center w-6 h-4 cursor-pointer transition-all duration-300 ${otherStyle}`}
      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
    >
      <span className={`bg-black rounded-full w-full h-[1px] transition-all duration-300 ${isOpen ? "rotate-90 translate-y-2" : ""}`}></span>
      <span className={`bg-black rounded-full w-full h-[1px] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
      <span className={`bg-black rounded-full w-full h-[1px] transition-all duration-300 ${isOpen ? "rotate-135 -translate-y-2" : ""}`}></span>
    </button>
  );
};

export default Hamburger;
