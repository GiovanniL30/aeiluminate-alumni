import React from "react";

import company from "../../../assets/company.png";
import salary from "../../../assets/money.png";
import worktype from "../../../assets/worktype.png";
import experience from "../../../assets/experience.png";

const Joblisting = () => {
  return (
    <div className="flex flex-col justify-between h-full border-t mt-10 pt-4">
      <div className="flex item-center gap-3 mb-4">
        <img src = {company} alt="Company" className="w-6 h-6"/>
        <span className="text-gray-500 text-sm">Add Company</span>
      </div>
    
      <div className="flex item-center gap-3 mb-4">
        <img src={salary} alt="salary" className="w-6 h-6" />
        <span className="text-gray-500 text sm">Add Pay</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <img src={worktype} alt="Work Type" className="w-6 h-6" />
        <span className="text-gray-500 text-sm">Work Type</span>
        <select className="ml-2 border-[1px] p-2 text-sm border-gray-300 rounded">
          <option value="">Select</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <img src={experience} alt="Experience Icon" className="w-6 h-6" />
        <span className="text-gray-500 text-sm">Experience Required</span>
      </div>
    </div>
  )
};

export default Joblisting;

// return <div>Add Company
//     <img src={company} alt="company"/>
//   </div>;