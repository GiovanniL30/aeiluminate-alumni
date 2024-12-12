import React, { useState } from "react";
import { useDeleteJob, useGetUser } from "../../_api/@react-client-query/query";

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
import ToastNotification from "../../constants/toastNotification.js";

/**
 * Job Card
 *
 * @author Jhea Jhana Prudencio, Giovanni Leo
 */
const JobCard = ({
  isReload = false,
  canBeDelete = false,
  workType,
  url,
  salary,
  jobTitle,
  jobID,
  experienceRequired,
  description,
  createdOn,
  createdBy,
  company,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const jobPosterQuery = useGetUser(createdBy);
  const { user } = useAuthContext();
  const deleteJob = useDeleteJob();

  if (jobPosterQuery.isLoading) {
    return <JobCardLoading />;
  }

  const handleDelete = () => {
    deleteJob.mutate(jobID, {
      onSuccess: () => {
        if (isReload) {
          window.location.reload();
        }
        setShowDelete(false);
        ToastNotification.success("Joblisting Deleted");
      },
      onError: (error) => {
        console.log(error);
        ToastNotification.error("Listing not deleted: " + error.message);
      },
    });
  };

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
        <div className="relative">
          {(user.userID === createdBy || canBeDelete) && (
            <button onClick={() => setShowDelete((prev) => !prev)}>
              <img className="w-1 h-4" src={more_vert} alt="dots" />
            </button>
          )}
          {showDelete && (
            <div className="top-10 z-50 absolute bg-white my-shadow flex flex-col items-center w-[150px] right-3 p-2 gap-2 rounded-mdl">
              <Button onClick={handleDelete} text="Delete Job" otherStyle="w-full" />
              <Button onClick={() => setShowDelete(false)} text="Cancel" otherStyle="w-full bg-red-500" />
            </div>
          )}
        </div>
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
