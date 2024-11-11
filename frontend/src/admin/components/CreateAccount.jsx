import React, { useState } from "react";

import Input from "./Input";
import Button from "./Button";

const roles = [
  {
    text: "Alumni",
    value: "alumni",
  },
  {
    text: "Manager",
    value: "manager",
  },
];

const CreateAccount = ({ openAddAcount, setOpenAddAcount }) => {
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    roleType: "alumni",
    email: "",
    password: "",
    program: "",
    yearGraduated: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.stopPropagation();

    console.log(data);
  };

  return (
    <div className="z-50 fixed bg-black bg-opacity-50 border-2 bottom-0 top-0 left-0 right-0 flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-white border-[1px] rounded-md w-3/4 min-w-[800px] max-w-[1200px]  p-10">
        <h1 className="font-bold text-2xl">Create Account</h1>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between w-full gap-3">
            <Input
              label="First Name"
              name="firstName"
              handleChange={handleChange}
              value={data.firstName}
            />
            <Input
              label="Middle Name"
              name="middleName"
              handleChange={handleChange}
              value={data.middleName}
            />
            <Input
              label="Last Name"
              name="lastName"
              handleChange={handleChange}
              value={data.lastName}
            />
          </div>
          <div className="flex justify-between w-full gap-3">
            <Input
              label="User Name"
              name="userName"
              handleChange={handleChange}
              value={data.userName}
            />
            <Input
              label="Role Type"
              name="roleType"
              options={roles}
              handleChange={handleChange}
              value={data.roleType}
            />
          </div>
          <div className="flex justify-between w-full gap-3">
            <Input
              label="Email Address"
              name="email"
              type="email"
              handleChange={handleChange}
              value={data.email}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              handleChange={handleChange}
              value={data.password}
            />
          </div>
          <div className="flex justify-between w-full gap-3">
            <Input
              label="Program"
              name="program"
              handleChange={handleChange}
              value={data.program}
            />
            <Input
              label="Year Graduated"
              name="yearGraduated"
              type="number"
              handleChange={handleChange}
              value={data.yearGraduated}
            />
          </div>
          <div className="self-end flex items-center gap-3 ">
            <Button text="Add" otherStyle="w-24" onClick={submit} />
            <Button
              text="Cancel"
              variant="outline"
              otherStyle="w-24"
              onClick={() => setOpenAddAcount(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
