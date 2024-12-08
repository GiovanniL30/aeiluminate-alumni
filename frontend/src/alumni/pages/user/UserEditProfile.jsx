import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useUpdateUserDetails } from "../../_api/@react-client-query/query";

const UserEditProfile = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { bio, company, firstName, job_role, lastName, middleName, phoneNumber, profile_picture, username, isPrivate } = user;
  const [userData, setUserData] = useState({
    firstName,
    lastName,
    middleName: middleName || "",
    phoneNumber: phoneNumber || "",
    bio: bio || "",
    company: company || "",
    username,
    job_role: job_role || "",
    isPrivate: isPrivate || 0,
  });

  const updateUserDetailsQuery = useUpdateUserDetails();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrivacyChange = (e) => {
    const { value } = e.target;
    setUserData((prev) => ({ ...prev, isPrivate: parseInt(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasChanges =
      JSON.stringify(userData) !==
      JSON.stringify({
        firstName,
        lastName,
        middleName: middleName || "",
        phoneNumber: phoneNumber || "",
        bio: bio || "",
        company: company || "",
        username,
        job_role: job_role || "",
      });

    if (!hasChanges) {
      alert("No changes detected.");
      return;
    }

    if (hasChanges) {
      updateUserDetailsQuery.mutate(
        {
          firstName: userData.firstName,
          middleName: userData.middleName,
          lastName: userData.lastName,
          userName: userData.username,
          company: userData.company,
          jobRole: userData.job_role,
          bio: userData.bio,
          phoneNumber: userData.phoneNumber,
          isPrivate: userData.isPrivate,
          id: id,
        },
        {
          onSuccess: () => {
            alert("UserPosts details updated successfully");
            navigate(`/user/${id}`);
          },
        }
      );
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <form className="flex flex-col gap-7 mt-6" onSubmit={handleSubmit}>
        <div className="flex gap-5 self-end">
          <NavLink to="..">
            <Button text="Cancel" otherStyle="bg-red-500" />
          </NavLink>
          <Button text={updateUserDetailsQuery.isPending ? "Updating" : "Save"} disabled={updateUserDetailsQuery.isPending} type="submit" />
        </div>

        <div className="flex gap-5">
          <h1 className="text-light_text font-semibold">Post Visibility:</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="public">Public</label>
              <input type="radio" name="isPrivate" value={0} id="public" checked={userData.isPrivate === 0} onChange={handlePrivacyChange} />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="private">Private</label>
              <input type="radio" name="isPrivate" value={1} id="private" checked={userData.isPrivate === 1} onChange={handlePrivacyChange} />
            </div>
          </div>
        </div>
        <Input value={userData.firstName} name="firstName" handleChange={handleChange} label="First Name" />
        <Input value={userData.middleName} name="middleName" handleChange={handleChange} label="Middle Name" required={false} />
        <Input value={userData.lastName} name="lastName" handleChange={handleChange} label="Last Name" />
        <Input value={userData.username} name="username" handleChange={handleChange} label="Username" />
        <Input value={userData.phoneNumber} name="phoneNumber" handleChange={handleChange} label="Phone Number" type="number" required={false} />
        <Input value={userData.company} name="company" handleChange={handleChange} label="Company" required={false} />
        <Input value={userData.job_role} name="job_role" handleChange={handleChange} label="Job Role" required={false} />
        <Input value={userData.bio} name="bio" handleChange={handleChange} label="Bio" type="textarea" otherStyle="h-20" required={false} />
      </form>
    </div>
  );
};

export default UserEditProfile;
