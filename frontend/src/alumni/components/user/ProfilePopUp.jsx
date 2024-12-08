import React, { useState } from "react";
import { useUpdateUserProfile } from "../../_api/@react-client-query/query";
import default_img from "../../../assets/default-img.png";
import Button from "../Button";

const ProfilePopUp = ({ profile_picture, setOpenProfile, canEdit, id }) => {
  const [newProfile, setNewProfile] = useState();
  const updateUserProfileQuery = useUpdateUserProfile();

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

  const handleSubmit = () => {
    if (newProfile) {
      updateUserProfileQuery.mutate(
        { oldProfileURL: profile_picture, newImage: newProfile, userId: id },
        {
          onSuccess: () => {
            alert("Profile updated successfully");
            setOpenProfile(false);
          },
        }
      );
    }
  };

  return (
    <div className="fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 bottom-0 left-0 right-0 w-full h-screen z-50 p-2">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={newProfile ? URL.createObjectURL(newProfile) : profile_picture || default_img}
              alt="Profile"
              className="w-full h-full max-w-[500px] object-cover  bg-white"
            />
            <button
              onClick={() => setOpenProfile(false)}
              className="absolute -top-16 -right-10 text-white bg-red-600 rounded-full w-10 h-10 hover-opacity right-0"
            >
              &#10005;
            </button>
          </div>
          {canEdit && (
            <div className="flex gap-3">
              <label htmlFor="upload" className="border-[1px] flex items-center px-6 rounded-md hover-opacity">
                <span className="text-white">Change Profile Pic</span>
              </label>
              <input type="file" id="upload" className="hidden" onChange={handleImageChange} accept="image/*" />
              <Button
                otherStyle={`${!newProfile && "hidden"}`}
                onClick={handleSubmit}
                text={`${updateUserProfileQuery.isPending ? "Saving..." : "Save"}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
