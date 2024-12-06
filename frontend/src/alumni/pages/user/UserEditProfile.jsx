import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useUpdateUserDetails, useUpdateUserProfile } from "../../_api/@react-client-query/query";
import default_img from "../../../assets/default-img.png";

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
  const [newProfile, setNewProfile] = useState();
  const updateUserDetailsQuery = useUpdateUserDetails();
  const updateUserProfileQuery = useUpdateUserProfile();
  const navigate = useNavigate();

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

    if (!hasChanges && !newProfile) {
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

    if (newProfile) {
      updateUserProfileQuery.mutate(
        { oldProfileURL: profile_picture, newImage: newProfile, userId: id },
        {
          onSuccess: () => {
            alert("Profile updated successfully");
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
          <Button
            text={updateUserDetailsQuery.isPending || updateUserProfileQuery.isPending ? "Updating" : "Save"}
            disabled={updateUserDetailsQuery.isPending || updateUserProfileQuery.isPending}
            type="submit"
          />
        </div>
        <h1 className="font-semibold text-light_text">Profile Picture</h1>
        <div className="relative group overflow-hidden w-[300px] mx-auto">
          <img
            src={newProfile ? URL.createObjectURL(newProfile) : profile_picture || default_img}
            alt="Profile"
            className="w-full h-[300px] object-cover rounded-full"
          />
          <label
            htmlFor="upload"
            className="rounded-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 absolute cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="text-white">Change Profile Pic</span>
          </label>
          <input type="file" id="upload" className="hidden" onChange={handleImageChange} accept="image/*" />
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
