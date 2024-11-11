import React from "react";

const DropDownOptions = ({
  options,
  handleOptionChange,
  queryData,
  name,
  otherStyle,
}) => {
  return (
    <>
      {options.map((option) => {
        return (
          <label
            key={option.value}
            className={`flex gap-2 rounded-md cursor-pointer ${otherStyle}`}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              className="hidden"
              type="radio"
              name={name}
              value={option.value}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionChange(e);
              }}
            />
            <img src={option.icon} alt="" />
            <p
              className={`p-1 rounded-md ${
                queryData === option.value ? "bg-primary_blue text-white" : ""
              } cursor-pointer ${otherStyle}`}
            >
              {option.title}
            </p>
          </label>
        );
      })}
    </>
  );
};

export default DropDownOptions;
