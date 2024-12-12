import React, { useState, useEffect } from "react";

import companyIcon from "../../../assets/company.png";
import salaryIcon from "../../../assets/money.png";
import worktypeIcon from "../../../assets/worktype.png";
import experienceIcon from "../../../assets/experience.png";

const Joblisting = ({jobDetails, setJobDetails}) => {

  return (
    <div className="flex flex-col justify-between h-full w-full border-t mt-10 pt-4 gap-4">
      <div className="flex items-center gap-3">
        <img src={companyIcon} alt="Company Icon" className="w-6 h-6" />
        <input
          type="text"
          value={jobDetails.company}
          onChange={(e) => setJobDetails({ ...jobDetails, company: e.target.value })}
          placeholder="Enter company name"
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <img src={salaryIcon} alt="Salary Icon" className="w-6 h-6" />
        <input
          type="text"
          value={jobDetails.salary}
          onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })}
          placeholder="Enter salary/pay (e.g., $50,000/year)"
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <img src={worktypeIcon} alt="Work Type Icon" className="w-6 h-6" />
        <select
          value={jobDetails.workType}
          onChange={(e) => setJobDetails({ ...jobDetails, workType: e.target.value })}
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        >
          <option value="">Select Work Type</option>
          <option value="on-site">On Site</option>
          <option value="wfh">Work From Home</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <img src={experienceIcon} alt="Experience Icon" className="w-6 h-6" />
        <input
          type="text"
          value={jobDetails.experience}
          onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })}
          placeholder="Enter experience required (e.g., 2+ years)"
          className="border-[1px] p-2 text-sm border-gray-300 rounded w-full"
        />
      </div>
    </div>
  );
};

export default Joblisting;
