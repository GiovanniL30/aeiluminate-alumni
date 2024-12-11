import React, { useState, useEffect } from "react";

import companyIcon from "../../../assets/company.png";
import salaryIcon from "../../../assets/money.png";
import worktypeIcon from "../../../assets/worktype.png";
import experienceIcon from "../../../assets/experience.png";

const Joblisting = () => {
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [workType, setWorkType] = useState("");
  const [experience, setExperience] = useState("");

  return (
    <div className="flex flex-col justify-between h-full w-full border-t mt-10 pt-4 gap-4">
      <div className="flex items-center gap-3">
        <img src={companyIcon} alt="Company Icon" className="w-6 h-6" />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name"
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <img src={salaryIcon} alt="Salary Icon" className="w-6 h-6" />
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter salary/pay (e.g., $50,000/year)"
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <img src={worktypeIcon} alt="Work Type Icon" className="w-6 h-6" />
        <select
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        >
          <option value="">Select Work Type</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <img src={experienceIcon} alt="Experience Icon" className="w-6 h-6" />
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Enter experience required (e.g., 2+ years)"
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        />
      </div>
    </div>
  );
};

export default Joblisting;

// return <div>Add Company
//     <img src={company} alt="company"/>
//   </div>;