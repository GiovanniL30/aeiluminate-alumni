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

const Signup = () => {
  return (
    <div className="padding bg-black min-h-screen flex w-full items-center">
      <div className="fixed top-5 z-30">
        <img className="w-12" src={logo} alt="logo" />
      </div>

      <div className="flex flex-col gap-5 text-white lg:flex-row-reverse w-full lg:gap-20 z-20">
        <div className="w-full">
          <h1 className="text-4xl font-bold lg:text-5xl max-w-[700px]">
            Make The First Impact – <br /> Share Your Light with ælluminate.
          </h1>
          <NavLink to="/login">
            <p className="hidden text-center mt-20 text-4xl  lg:flex gap-10 justify-center hover-opacity">
              <span>&larr; </span> <span>Login</span>
            </p>
          </NavLink>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1>Primary Information</h1>
              <Input placeholder="First Name" otherStyle="border-[1px] border-white bg-transparent" />
              <Input placeholder="Middle Name" otherStyle="border-[1px] border-white bg-transparent" />
              <Input placeholder="Last Name" otherStyle="border-[1px] border-white bg-transparent" />
              <Input placeholder="User Name" otherStyle="border-[1px] border-white bg-transparent" />
              <div className="flex gap-3">
                <Input type="password" placeholder="Password" otherStyle="border-[1px] border-white bg-transparent" />
                <Input type="password" placeholder="Confirm Password" otherStyle="border-[1px] border-white bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h1>Secondary Information</h1>
              <Input type="email" placeholder="Email" otherStyle="border-[1px] border-white bg-transparent" />
              <div className="lg:flex gap-3">
                <Input placeholder="Graduation Year" type="number" otherStyle="border-[1px] border-white bg-transparent" />
                <Input placeholder="Program (eg.Information Technology)" otherStyle="border-[1px] border-white bg-transparent" />
              </div>
            </div>

            <div>
              <h1>Documents</h1>
              <Input placeholder="diploma" otherStyle="border-[1px] border-white bg-transparent" min={1900} />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" />
              <label className="text-sm" htmlFor="terms">
                I agree to aeiluminate Terms and Conidtions
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
        className=" fixed max-h-[500px] bottom-0 left-0 right-0 w-full xl:w-1/2 xl:left-auto xl:-bottom-40 xl:max-w-auto xl:rotate-[-30deg] xl:-right-40"
        src={earth}
        alt=""
      />
    </div>
  );
};

export default Signup;
