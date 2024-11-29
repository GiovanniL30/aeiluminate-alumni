import React, { useState } from "react";
import logo from "../../assets/logo-login.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLoginUser } from "../_api/@react-client-query/query";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, useSearchParams } from "react-router-dom";
import TopPopUp from "../components/TopPopUp";

const Signin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [redirecting, setRedirecting] = useState(false);
  const userQuery = useLoginUser();
  const { user, isLoading, setUser } = useAuthContext();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    userQuery.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => {
          setUser(data.user);
          setRedirecting(true);
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  if (isLoading) return <h1>Loading....</h1>;
  if (Object.keys(user).length !== 0) return <Navigate to="/" />;
  if (redirecting) return <Navigate to="/" />;

  return (
    <div className="padding">
      <div className="max-container flex flex-col justify-center items-center gap-10">
        {error && <TopPopUp text={error} />}
        <div className="max-w-[500px]">
          <img className="w-full" src={logo} alt="aeiluminate" />
        </div>

        <form className="w-full max-w-[600px] flex flex-col gap-5" onSubmit={submit}>
          <Input label="Email" type="email" name="email" value={data.email} handleChange={handleChange} />
          <Input type="password" label="Password" name="password" value={data.password} handleChange={handleChange} />
          <Button type="submit" text={userQuery.isPending ? "Logging in..." : "Login"} otherStyle="w-full" disabled={userQuery.isPending} />
        </form>

        {userQuery.isError && <p className="text-red-500 mt-4">Login failed: {userQuery.error?.message}</p>}
      </div>
    </div>
  );
};

export default Signin;
