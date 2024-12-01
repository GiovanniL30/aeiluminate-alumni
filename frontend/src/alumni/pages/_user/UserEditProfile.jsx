import React, { useState } from "react";
import Input from "../../components/Input";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";

const UserEditProfile = () => {
  const { user } = useAuthContext();

  const { bio, company, firstName, job_role, lastName, middleName, phoneNumber, profile_picture, username } = user;

  const [userData, setUserData] = useState({
    firstName,
    lastName,
    middleName: middleName ? middleName : "",
    phoneNumber: phoneNumber ? phoneNumber : "",
    bio: bio ? bio : "",
    company: company ? company : "",
    username,
    job_role: job_role ? job_role : "",
  });

  const [newProfile, setNewProfile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert("Please upload an image file.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size must be less than 5MB.");
        return;
      }
      setNewProfile(file);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <div className="flex flex-col gap-7 mt-6">
        <h1 className="font-semibold text-light_text">Profile Picture</h1>
        <div className="relative group overflow-hidden w-[300px] mx-auto">
          <img
            src={newProfile ? URL.createObjectURL(newProfile) : profile_picture}
            alt="Profile"
            className="w-full h-[300px] object-cover rounded-full "
          />

          <label
            htmlFor="upload"
            className="rounded-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 absolute cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="text-white">Change Profile Pic</span>
          </label>

          <input type="file" id="upload" className="hidden" onChange={handleImageChange} accept="image/*" />
        </div>
        <Input value={userData.firstName} name="firstName" handleChange={handleChange} label="First Name" />
        <Input value={userData.middleName} name="middleName" handleChange={handleChange} label="Middle Name" />
        <Input value={userData.lastName} name="lastName" handleChange={handleChange} label="Last Name" />
        <Input value={userData.username} name="username" handleChange={handleChange} label="Username" />
        <Input value={userData.phoneNumber} name="phoneNumber" handleChange={handleChange} label="Phone Number" type="number" />
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
