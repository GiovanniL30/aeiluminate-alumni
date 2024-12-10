import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useGetUser, useUpdateUserDetails } from "../../_api/@react-client-query/query";
import ToastNotification from "../../constants/toastNotification";
import Button from "../../components/Button";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const UserEditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userQuery = useGetUser(id);
  const updateUserDetailsQuery = useUpdateUserDetails();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userQuery.data) {
      const { bio, company, firstName, job_role, lastName, middleName, phoneNumber, username, isPrivate } = userQuery.data.user;

      setUserData({
        firstName,
        lastName,
        middleName: middleName || "",
        phoneNumber: phoneNumber || "",
        bio: bio || "",
        company: company || "",
        username,
        job_role: job_role || "",
        isPrivate: isPrivate,
      });
    }
  }, [userQuery.data]);

  if (userQuery.isLoading) return <h1>Loading...</h1>;
  if (userQuery.isError) return <h1>Error loading user data.</h1>;

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

    if (!userData) {
      ToastNotification.warning("No data available to update.");
      return;
    }

    const initialUserData = {
      firstName: userQuery.data.user.firstName,
      lastName: userQuery.data.user.lastName,
      middleName: userQuery.data.user.middleName || "",
      phoneNumber: userQuery.data.user.phoneNumber || "",
      bio: userQuery.data.user.bio || "",
      company: userQuery.data.user.company || "",
      username: userQuery.data.user.username,
      job_role: userQuery.data.user.job_role || "",
      isPrivate: userQuery.data.user.isPrivate,
    };

    const hasChanges = JSON.stringify(userData) !== JSON.stringify(initialUserData);

    if (!hasChanges) {
      ToastNotification.warning("No changes detected.");
      return;
    }

    updateUserDetailsQuery.mutate(
      {
        ...userData,
        id,
      },
      {
        onSuccess: () => {
          ToastNotification.success("User details updated successfully.");
          navigate(`/user/${id}`);
        },
        onError: (error) => {
          ToastNotification.error(error.message);
        },
      }
    );
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <form className="flex flex-col gap-7 mt-6" onSubmit={handleSubmit}>
        <div className="flex gap-5 self-end">
          <NavLink to="..">
            <Button text="Cancel" otherStyle="bg-red-500" />
          </NavLink>
          <Button text={updateUserDetailsQuery.isLoading ? "Updating..." : "Save"} disabled={updateUserDetailsQuery.isLoading} type="submit" />
        </div>

        <div className="flex gap-5">
          <h1 className="text-light_text font-semibold">Post Visibility:</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="public">Public</label>
              <input type="radio" name="isPrivate" value={0} id="public" checked={userData?.isPrivate === 0} onChange={handlePrivacyChange} />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="private">Private</label>
              <input type="radio" name="isPrivate" value={1} id="private" checked={userData?.isPrivate === 1} onChange={handlePrivacyChange} />
            </div>
          </div>
        </div>
        <Input value={userData?.firstName || ""} name="firstName" handleChange={handleChange} label="First Name" />
        <Input value={userData?.middleName || ""} name="middleName" handleChange={handleChange} label="Middle Name" required={false} />
        <Input value={userData?.lastName || ""} name="lastName" handleChange={handleChange} label="Last Name" />
        <Input value={userData?.username || ""} name="username" handleChange={handleChange} label="Username" />
        <Input
          value={userData?.phoneNumber || ""}
          name="phoneNumber"
          handleChange={handleChange}
          label="Phone Number"
          type="number"
          required={false}
        />
        <Input value={userData?.company || ""} name="company" handleChange={handleChange} label="Company" required={false} />
        <Input value={userData?.job_role || ""} name="job_role" handleChange={handleChange} label="Job Role" required={false} />
        <Input value={userData?.bio || ""} name="bio" handleChange={handleChange} label="Bio" type="textarea" otherStyle="h-20" required={false} />
      </form>
    </div>
  );
};

export default UserEditProfile;
