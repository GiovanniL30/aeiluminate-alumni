import React, { useCallback, useState } from "react";
import logo from "../../assets/logo-login-small.png";
import earth from "../../assets/earth.webp";
import Input from "../components/Input";
import Button from "../components/Button";
import { useApplication, usePrograms } from "../_api/@react-client-query/query";
import { NavLink, useNavigate } from "react-router-dom";
import ToastNotification from "../constants/toastNotification";

/**
 *
 *
 * @author Giovanni Leo
 */
const Signup = () => {
  const programsQuery = usePrograms();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("SAMCIS");

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
  });

  const applyQuery = useApplication();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];

      if (file.size > 5242880) {
        ToastNotification.error("File size must be less than 5MB.");
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
      !formData.lastName ||
      !formData.userName ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email ||
      !formData.graduationYear ||
      !formData.programID
    ) {
      setErrorMessage("Please fill in all the fields.");
      ToastNotification.error("Please fill in all the fields.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Please Agree to Terms and Conditions");
      ToastNotification.error("Please Agree to Terms and Conditions");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      ToastNotification.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      ToastNotification.error("Passwords do not match.");
      return;
    }

    if (formData.graduationYear < 1973 || formData.graduationYear > new Date().getFullYear()) {
      setErrorMessage("Graduation must be between 1973 to " + new Date().getFullYear());
      ToastNotification.error("Graduation must be between 1973 to " + new Date().getFullYear());
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|slu\.edu\.ph)$/;

    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Invalid email domain. Only @gmail.com and @slu.edu.ph emails are allowed.");
      ToastNotification.error("Invalid email domain. Only @gmail.com and @slu.edu.ph emails are allowed.");
      return;
    }

    applyQuery.mutate(
      {
        email: formData.email,
        roleType: "Alumni",
        userName: formData.userName,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        program: formData.programID,
        yearGraduated: formData.graduationYear,
        type: "Application",
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          ToastNotification.success("Account Creation is Successfull");
          setFormData({
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
          });
          navigate("/login");
        },
        onError: (error) => {
          setErrorMessage(error.message);
          ToastNotification.error(error.message);
        },
      }
    );
  };
  if (programsQuery.isLoading) return <h1>Loading...</h1>;

  const schoolNames = programsQuery.data.map((school) => school.school_name);
  const uniqueValues = [...new Set(schoolNames)];

  return (
    <div className="p-5 py-16 bg-black min-h-screen flex w-full items-center">
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
                labelColor="text-white"
                label="First Name"
                disabled={applyQuery.isPending}
                name="firstName"
                placeholder="eg. Juan"
                value={formData.firstName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <Input
                required={false}
                labelColor="text-white"
                label="Middle Name"
                disabled={applyQuery.isPending}
                name="middleName"
                placeholder="eg. Pedro (leave blank if no middle name)"
                value={formData.middleName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <Input
                labelColor="text-white"
                label="Last Name"
                disabled={applyQuery.isPending}
                name="lastName"
                placeholder="eg. DeLa Cruz"
                value={formData.lastName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <Input
                labelColor="text-white"
                label="Username"
                disabled={applyQuery.isPending}
                name="userName"
                placeholder="eg. juan123"
                value={formData.userName}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  labelColor="text-white"
                  label="Password"
                  disabled={applyQuery.isPending}
                  type="password"
                  name="password"
                  placeholder="eg. 12345"
                  value={formData.password}
                  handleChange={handleChange}
                  otherStyle="border-[1px] border-white bg-transparent"
                />
                <Input
                  labelColor="text-white"
                  label="Confirm Password"
                  disabled={applyQuery.isPending}
                  type="password"
                  name="confirmPassword"
                  placeholder="eg. 12345"
                  value={formData.confirmPassword}
                  handleChange={handleChange}
                  otherStyle="border-[1px] border-white bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h1>Secondary Information</h1>
              <Input
                labelColor="text-white"
                label="Email"
                disabled={applyQuery.isPending}
                type="email"
                name="email"
                placeholder="eg. sample@gmail.com"
                value={formData.email}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />

              <Input
                labelColor="text-white"
                label="Graduation Year"
                disabled={applyQuery.isPending}
                name="graduationYear"
                placeholder="eg. 2007"
                type="number"
                value={formData.graduationYear}
                handleChange={handleChange}
                otherStyle="border-[1px] border-white bg-transparent"
              />

              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full">
                  <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    name="schoolId"
                    className="py-2 h-full lg:h-[39.5px] lg:mb-[3px] bg-transparent text-sm border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue w-full"
                  >
                    {uniqueValues.map((schools, index) => (
                      <option className="text-black" key={index} value={schools}>
                        {schools}
                      </option>
                    ))}
                  </select>
                </div>

                {programsQuery.data && (
                  <div className="w-full">
                    <select
                      name="programID"
                      value={formData.programID}
                      onChange={handleChange}
                      className="py-2 h-full lg:h-[39.5px] lg:mb-[3px] bg-transparent text-sm border-[1px] rounded-sm border-gray-100 focus:outline-primary_blue w-full"
                    >
                      {programsQuery.data
                        .filter((program) => program.school_name == selectedSchool)
                        .map((program) => (
                          <option className="text-black" key={program.programID} value={program.programID}>
                            {program.program_name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                disabled={applyQuery.isPending}
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
              />
              <p className="text-sm" htmlFor="terms">
                I agree to ælluminate{" "}
                <a
                  className="underline text-violet-200 hover-opacity"
                  target="_blank"
                  href="https://drive.google.com/uc?export=download&id=1erXfN2FNdze6LEBomNtVFi9IUtZUVVlm"
                >
                  Terms and Conditions
                </a>
              </p>
            </div>

            {errorMessage && <h1 className="text-center text-red-500">{errorMessage}</h1>}
            <Button disabled={applyQuery.isPending} text={`${applyQuery.isPending ? "Submitting Application" : "Sign Up"}`} type="submit" />

            <p className="text-center lg:hidden">
              Already have an account?{" "}
              <NavLink to="/login" className={`underline hover-opacity ${applyQuery.isPending && "pointer-events-none"}`}>
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

const ImageUpload = ({ name, handleChange, value, disabled }) => {
  const handleRemoveFile = () => {
    handleChange({ target: { name, value: null } });
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={`text-sm bg-white text-black py-2 px-4 rounded-md hover-opacity cursor-pointer w-full ${disabled && "pointer-events-none"}`}
      >
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
