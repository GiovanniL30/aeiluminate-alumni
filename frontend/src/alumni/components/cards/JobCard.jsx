import React from "react";
import { useGetUser } from "../../_api/@react-client-query/query";

import companyIcon from "../../../assets/company.png";
import salaryIcon from "../../../assets/money.png";
import worktypeIcon from "../../../assets/worktype.png";
import experienceIcon from "../../../assets/experience.png";
import more_vert from "../../../assets/more_vert.png";
import UserProfilePic from "../UserProfilePic";
import { useAuthContext } from "../../context/AuthContext";
import { ReadMore } from "../ReadMore";
import Button from "../Button";
import JobCardLoading from "./loaders/JobCardLoading";

const JobCard = ({ workType, url, salary, jobTitle, jobID, experienceRequired, description, createdOn, createdBy, company }) => {
  const jobPosterQuery = useGetUser(createdBy);
  const { user } = useAuthContext();

  if (jobPosterQuery.isLoading) {
    return <JobCardLoading />;
  }

  const jobPoster = jobPosterQuery.data.user;
  return (
    <div className="my-shadow rounded-md p-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <UserProfilePic userID={createdBy} profile_link={jobPoster.profile_picture} />
          <p className="font-bold">
            {jobPoster.username} {jobPoster.userID == user.userID && <span className="text-primary_blue">(YOU)</span>}
          </p>
        </div>
        {user.userID == jobPoster.userID && (
          <button>
            <img className="w-1" src={more_vert} alt="" />
          </button>
        )}
      </div>
      <div className="flex flex-col p-5 mt-1">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">{jobTitle}</h1>
          <div className="flex items-center gap-2">
            <img className="w-5" src={companyIcon} alt="" />
            <p>{company}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2 p-2">
          <div>
            <h1 className="font-semibold">Job Details</h1>
            <div className="pl-2">
              <ReadMore text={description} />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2 ">
            <div className="flex items-center gap-2">
              <img className="w-6 h-6 object-contain" src={salaryIcon} alt="" />
              <p>PHP {salary} a month</p>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-4 h-4 object-contain" src={worktypeIcon} alt="" />
              <p>{workType.toUpperCase()}</p>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-5 h-5 object-contain" src={experienceIcon} alt="" />
              <p>{experienceRequired} Years</p>
            </div>
          </div>
        </div>
        <a className="mt-4" href={url} target="_blank">
          <Button text="Apply" />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
