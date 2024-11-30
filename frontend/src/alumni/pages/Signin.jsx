import React, { useState } from "react";
import logo from "../../assets/logo-login-small.png";
import commet from "../../assets/commet.webp";
import earth from "../../assets/earth.webp";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLoginUser } from "../_api/@react-client-query/query";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, NavLink, useSearchParams } from "react-router-dom";
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
    setData((prev) => ({ ...prev, [name]: value.trim() }));
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
    <div className="padding bg-black min-h-screen flex w-full items-center">
      {error && <TopPopUp text={error} />}
      <div className="fixed top-5 z-30">
        <img className="w-12" src={logo} alt="logo" />
      </div>
      <div className="flex w-full ">
        <div className="text-white relative w-full z-30 max-w-[600px] mx-auto ">
          <h1 className="z-20 text-4xl font-bold">
            Make The First Impact – <br /> Share Your Light with ælluminate.
          </h1>
          <form className="z-20 w-full flex flex-col gap-5 items-center " onSubmit={submit}>
            <Input
              otherStyle="border-[1px] border-white bg-black"
              label="Email"
              type="email"
              name="email"
              value={data.email}
              handleChange={handleChange}
            />
            <Input
              otherStyle="border-[1px] border-white bg-black"
              type="password"
              label="Password"
              name="password"
              value={data.password}
              handleChange={handleChange}
            />
            <Button type="submit" text={userQuery.isPending ? "Logging in..." : "Login"} otherStyle="w-full" disabled={userQuery.isPending} />
            <p>
              Don't have an account?{" "}
              <NavLink className="underline hover-opacity" to="/register">
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </div>

      <img className="fixed max-h-[500px] bottom-0 left-0 right-0 w-full " src={earth} alt="" />
    </div>
  );
};

export default Signin;
