import React, { useState } from "react";
import Input from "../../components/Input";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";

const UserEditProfile = () => {
  const { user } = useAuthContext();

  const { bio, company, email, firstName, job_role, lastName, middleName, phoneNumber, profile_picture, role, userID, username } = user;

  const [userData, setUserData] = useState({
    firstName,
    lastName,
    bio: bio ? bio : "",
    company: company ? company : "",
    username,
    job_role: job_role ? job_role : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <div className="flex flex-col gap-7 mt-6">
        <Input value={userData.firstName} name="firstName" handleChange={handleChange} label="First Name" />
        <Input value={userData.lastName} name="lastName" handleChange={handleChange} label="Last Name" />
        <Input value={userData.username} name="username" handleChange={handleChange} label="Username" />
        <Input value={userData.company} name="company" handleChange={handleChange} label="Company" />
        <Input value={userData.job_role} name="job_role" handleChange={handleChange} label="Job Role" />
        <Input value={userData.bio} name="bio" handleChange={handleChange} label="Bio" type="textarea" otherStyle="h-20" />
        <div className="flex gap-5 self-end">
          <NavLink to="..">
            <Button text="Cancel" otherStyle="bg-red-500" />
          </NavLink>
          <Button text="Save" />
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
