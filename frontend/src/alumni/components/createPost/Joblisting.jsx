import React, { useState, useEffect } from "react";

import companyIcon from "../../../assets/company.png";
import salaryIcon from "../../../assets/money.png";
import worktypeIcon from "../../../assets/worktype.png";
import experienceIcon from "../../../assets/experience.png";
import Input from "../Input";

const Joblisting = ({ jobDetails, setJobDetails }) => {
  return (
    <div className=" max-w-[700px] mx-auto flex flex-col justify-between h-full w-full gap-4">
      <div>
        <p>Job Title</p>
        <div className="flex items-center gap-2">
          <img className="object-cover" src={companyIcon} alt="" />
          <Input name="jobTitle" value={jobDetails.jobTitle} handleChange={setJobDetails} placeholder="Input company here" />
        </div>
      </div>
      <div>
        <p>Company</p>
        <div className="flex items-center gap-2">
          <img className="object-cover" src={companyIcon} alt="" />
          <Input name="company" value={jobDetails.company} handleChange={setJobDetails} placeholder="Input company here" />
        </div>
      </div>
      <div>
        <p>Salary (PHP)</p>
        <div className="flex items-center gap-2">
          <img className="object-cover" src={salaryIcon} alt="" />
          <Input name="salary" value={jobDetails.salary} handleChange={setJobDetails} placeholder="Input salary here" type="number" />
        </div>
      </div>
      <div>
        <p>Work Type</p>
        <div className="flex items-center gap-2">
          <img src={worktypeIcon} alt="Work Type Icon" className="w-6 h-6" />
          <select value={jobDetails.workType} onChange={setJobDetails} className="border-[1px] p-2 text-sm rounded w-full">
            <option value="on-site">On Site</option>
            <option value="wfh">Work From Home</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>
      <div>
        <p>Experience Required</p>
        <div className="flex items-center gap-2">
          <img className="object-cover" src={experienceIcon} alt="" />
          <Input
            name="experienceRequired"
            value={jobDetails.experienceRequired}
            handleChange={setJobDetails}
            placeholder="Input experience here"
            type="number"
          />
        </div>
      </div>

      <div>
        <p>Site URL</p>
        <div className="flex items-center gap-2">
          <img className="object-cover" src={companyIcon} alt="" />
          <Input name="url" value={jobDetails.url} handleChange={setJobDetails} placeholder="Input site here" />
        </div>
      </div>
      <div className="relative">
        <p>Job Description</p>
        <textarea
          value={jobDetails.description}
          onChange={setJobDetails}
          name="description"
          placeholder="eg. Party Party"
          className="p-2  text-sm focus:outline-none resize-none border-[1px] w-full h-36"
        ></textarea>
        <p className="absolute text-sm text-light_text bottom-3 right-3">
          {jobDetails.description.length}/{225}
        </p>
      </div>
    </div>
  );
};

export default Joblisting;
