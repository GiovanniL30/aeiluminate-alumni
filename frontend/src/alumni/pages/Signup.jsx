import React, { useState } from "react";
import logo from "../../assets/logo-login-small.png";
import earth from "../../assets/earth.webp";
import Input from "../components/Input";
import Button from "../components/Button";
import { usePrograms } from "../_api/@react-client-query/query";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const programsQuery = usePrograms();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    graduationYear: "",
    programID: 1,
    termsAccepted: false,
    diploma: null,
    schoolId: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];

      if (file.size > 5242880) {
        alert("File size must be less than 5MB.");
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.middleName ||
      !formData.lastName ||
      !formData.userName ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email ||
      !formData.graduationYear ||
      !formData.programID ||
      !formData.termsAccepted
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    if (!formData.diploma || !formData.schoolId) {
      alert("Please upload diploma and school id image");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.diploma && formData.diploma.size > 5242880) {
      alert("Diploma file size must be less than 5MB.");
      return;
    }

    if (formData.schoolId && formData.schoolId.size > 5242880) {
      alert("School ID file size must be less than 5MB.");
      return;
    }

    console.log("Form Submitted", formData);
  };
  if (programsQuery.isLoading) return <h1>Loading...</h1>;

  return (
    <div className="padding bg-black min-h-screen flex w-full items-center">
      <div className="fixed top-0 z-30 bg-black w-full h-20 flex items-center">
        <img className="w-12" src={logo} alt="logo" />
      </div>

      <div className="max-w-[1200px] mt-14 flex flex-col mx-auto gap-5 text-white lg:flex-row-reverse w-full lg:gap-20 z-20">
        <div className="w-full">
          <h1 className="text-4xl font-bold lg:text-5xl max-w-[700px]">
            Make The First Impact – <br /> Share Your Light with ælluminate.
          </h1>
          <NavLink to="/login">
            <p className="hidden text-center mt-20 text-4xl lg:flex gap-10 justify-center hover-opacity">
              <span>&larr; </span> <span>Login</span>
            </p>
          </NavLink>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <h1>Primary Information</h1>
              <Input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <Input
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <Input
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <div className="flex gap-3">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  handleChange={handleChange}
                  otherStyle="border-[1px] border-white bg-transparent"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  handleChange={handleChange}
                  otherStyle="border-[1px] border-white bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h1>Secondary Information</h1>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />

              <Input
                name="graduationYear"
                placeholder="Graduation Year"
                type="number"
                value={formData.graduationYear}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              {programsQuery.data && (
                <div className="h-full mt-2 flex items-center">
                  <select
                    name="programID"
                    value={formData.programID}
                    onChange={handleChange}
                    className="py-2 h-full lg:h-[39.5px] lg:mb-[3px] bg-transparent text-sm border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue w-full"
                  >
                    {programsQuery.data.map((program) => (
                      <option className="text-black" key={program.programID} value={program.programID}>
                        {program.program_name} - {program.school_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <h1>Documents</h1>
              <div className="flex gap-10 justify-between w-full h-full">
                <ImageUpload name="diploma" handleChange={handleChange} value={formData.diploma} />
                <ImageUpload name="schoolId" handleChange={handleChange} value={formData.schoolId} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" name="termsAccepted" checked={formData.termsAccepted} onChange={handleCheckboxChange} />
              <label className="text-sm" htmlFor="terms">
                I agree to ælluminate Terms and Conditions
              </label>
            </div>

            <Button text="Sign Up" type="submit" />

            <p className="text-center lg:hidden">
              Already have an account?{" "}
              <NavLink to="/login" className="underline hover-opacity">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>

      <img
        className="fixed max-h-[500px] bottom-0 left-0 right-0 w-full xl:w-1/2 xl:left-auto xl:-bottom-40 xl:max-w-auto xl:rotate-[-30deg] xl:-right-40"
        src={earth}
        alt="background image"
      />
    </div>
  );
};

export default Signup;

const ImageUpload = ({ name, handleChange, value }) => {
  const handleRemoveFile = () => {
    handleChange({ target: { name, value: null } });
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="text-sm bg-white text-black py-2 px-4 rounded-md hover-opacity cursor-pointer w-full">
        Upload {name === "diploma" ? "Diploma" : "School ID"}
      </label>
      <input id={name} type="file" name={name} accept=".jpg, .jpeg, .png" className="hidden" onChange={(e) => handleChange(e)} />
      {value ? (
        <div className="mt-6">
          <img className="w-52 h-52 object-cover" src={URL.createObjectURL(value)} alt="" />
          <button type="button" onClick={handleRemoveFile} className="text-red-500 text-sm mt-1 hover:underline">
            Remove
          </button>
        </div>
      ) : (
        <h1 className="mt-5 text-red-500">*Nothing selected</h1>
      )}
    </div>
  );
};
