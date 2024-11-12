import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

import ProgramInput from "./ProgramInput";
import { useCreateUser, useGetPrograms } from "../_api/@react-query/query";

const roles = [
  { text: "Alumni", value: "Alumni" },
  { text: "Manager", value: "Manager" },
];

const employment = [
  { text: "Employed", value: 1 },
  { text: "Unemployed", value: 0 },
];

const CreateAccount = ({ setOpenAddAcount }) => {
  const programsQuery = useGetPrograms();
  const createUserMutation = useCreateUser(setOpenAddAcount);

  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    roleType: "Alumni",
    email: "",
    password: "",
    employment: 1,
    program: 1,
    yearGraduated: 2024,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    createUserMutation.mutate(data);
  };

  if (programsQuery.isLoading) return <h1>Loading...</h1>;
  if (programsQuery.isError) return <h1>Error loading programs</h1>;

  return (
    <div className="z-50 fixed bg-black bg-opacity-50 border-2 bottom-0 top-0 left-0 right-0 flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-white border-[1px] rounded-md w-3/4 min-w-[800px] max-w-[1200px]  p-10">
        <h1 className="font-bold text-2xl">Create Account</h1>
        <form className="flex flex-col gap-5" onSubmit={submit}>
          <div className="flex justify-between w-full gap-3">
            <Input label="First Name" name="firstName" handleChange={handleChange} value={data.firstName} />
            <Input label="Middle Name" name="middleName" handleChange={handleChange} value={data.middleName} />
            <Input label="Last Name" name="lastName" handleChange={handleChange} value={data.lastName} />
          </div>
          <div className="flex justify-between w-full gap-3">
            <Input label="User Name" name="userName" handleChange={handleChange} value={data.userName} />
            <Input label="Role Type" name="roleType" options={roles} handleChange={handleChange} value={data.roleType} />
          </div>
          <div className="flex justify-between w-full gap-3">
            <Input label="Email Address" name="email" type="email" handleChange={handleChange} value={data.email} />
            <Input label="Password" name="password" type="password" handleChange={handleChange} value={data.password} min={8} />
          </div>

          {data.roleType === "Alumni" && (
            <>
              <div className="flex justify-between w-full gap-3">
                <Input label="Employment" name="employment" options={employment} handleChange={handleChange} value={data.employment} />
                <Input label="Year Graduated" name="yearGraduated" type="number" handleChange={handleChange} value={data.yearGraduated} />
              </div>
              <ProgramInput programs={programsQuery.data} value={data.program} handleChange={handleChange} />
            </>
          )}

          <div className="self-end flex items-center gap-3">
            <Button
              text={`${createUserMutation.isPending ? "Creating Account..." : "Add"}`}
              otherStyle="w-24"
              type="submit"
              disabled={createUserMutation.isPending}
            />
            <Button type="button" text="Cancel" variant="outline" otherStyle="w-24" onClick={() => setOpenAddAcount(false)} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
