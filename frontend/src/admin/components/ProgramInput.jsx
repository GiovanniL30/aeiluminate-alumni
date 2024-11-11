import React from "react";

const ProgramInput = ({ programs, handleChange, value }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="programSelect"
        className="text-light_text text-sm font-semibold"
      >
        Program
      </label>
      <select
        onChange={handleChange}
        name="program"
        value={value}
        className="w-full p-2 text-light_text border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue"
      >
        {programs.map((program) => (
          <option
            className="rounded-sm"
            key={program.programID}
            value={program.programID}
          >
            {program.program_name}
            {program.specialization ? `- ${program.specialization}` : ""}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgramInput;
