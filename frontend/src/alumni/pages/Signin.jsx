import React, { useState } from "react";
import { Navigate, NavLink, useSearchParams } from "react-router-dom";
import { useLoginUser } from "../_api/@react-client-query/query";
import { useAuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import TopPopUp from "../components/TopPopUp";
import logo from "../../assets/logo-login-small.png";
import earth from "../../assets/earth.webp";

/**
 *
 *
 * @author Giovanni Leo
 */
const Signin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isPending } = useLoginUser();
  const { user, token, setToken, setUser } = useAuthContext();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value.trim() }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data) {
      setErrorMessage("No data provided. Please fill out the form.");
      return;
    }

    mutate(data, {
      onSuccess: (response) => {
        const { user, token } = response || {};
        if (user && token) {
          setErrorMessage("");
          setUser(user);
          setToken(token);
        } else {
          setErrorMessage("Unexpected response format. Please try again.");
        }
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || error?.message || "An error occurred. Please try again.";
        setErrorMessage(errorMessage);
      },
    });
  };

  if (user && token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-5 bg-black min-h-screen flex w-full items-center">
      {error && <TopPopUp text={error} />}
      <div className="fixed top-5 z-30">
        <img className="w-12" src={logo} alt="logo" />
      </div>
      <div className="flex w-full">
        <div className="text-white relative w-full z-30 max-w-[600px] mx-auto">
          <h1 className="z-20 text-4xl font-bold">
            Make The First Impact – <br /> Share Your Light with ælluminate.
          </h1>
          <form className="z-20 w-full flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
            <Input
              labelColor="text-white"
              otherStyle="border-[1px] border-white bg-black "
              label="Email"
              type="email"
              name="email"
              placeholder="eg. sample@gmail.com"
              value={data.email}
              handleChange={handleChange}
            />
            <Input
              labelColor="text-white"
              otherStyle="border-[1px] border-white bg-black"
              type="password"
              label="Password"
              name="password"
              placeholder="eg. 12345"
              value={data.password}
              handleChange={handleChange}
            />
            {errorMessage && <h1 className="text-red-500 text-center">{errorMessage}</h1>}
            <Button type="submit" text={isPending ? "Logging in..." : "Login"} otherStyle="w-full" disabled={isPending} />
            <p>
              Don't have an account?{" "}
              <NavLink className="underline hover-opacity" to="/register">
                Sign Up
              </NavLink>
            </p>

            <NavLink className="underline hover-opacity" to="/recover">
              Forgot Password?
            </NavLink>
          </form>
        </div>
      </div>
      <img className="fixed max-h-[500px] bottom-0 left-0 right-0 w-full" src={earth} alt="Earth background" />
    </div>
  );
};

export default Signin;
