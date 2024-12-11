import React, { useEffect, useState } from "react";
import logo from "../../assets/logo-login-small.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import OtpInput from "react-otp-input";
import ToastNotification from "../constants/toastNotification";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState({ new: "", confirm: "" });

  const handleEmailSubmit = (e) => {
    if (!email) {
      ToastNotification.error("Please enter a valid email");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|slu\.edu\.ph)$/;

    if (!emailRegex.test(email)) {
      ToastNotification.error("Invalid email domain. Only @gmail.com and @slu.edu.ph emails are allowed.");
      return;
    }

    setStep(2);
  };

  const verifyCode = () => {
    if (otp.length != 5) {
      ToastNotification.error("Fill the OTP code");
      return;
    }

    setStep(3);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const submitPassword = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password.new)) {
      ToastNotification.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
      );
      return;
    }

    if (password.new !== password.confirm) {
      ToastNotification.error("Passwords do not match");
      return;
    }

    console.log(password.new);
  };

  return (
    <div className="p-5 min-h-screen flex  w-full items-center">
      <div className="fixed top-5 z-30">
        <img className="w-12" src={logo} alt="logo" />
      </div>
      <div className="w-full max-w-[550px] mx-auto">
        {step == 1 && <InputEmail onChange={(e) => setEmail(e.target.value)} value={email} submit={handleEmailSubmit} />}
        {step == 2 && <OTP verifyCode={verifyCode} email={email} setOtp={setOtp} otp={otp} />}
        {step == 3 && <PasswordReset submitPassword={submitPassword} password={password} setPassword={handlePasswordChange} />}
      </div>
    </div>
  );
};

const InputEmail = ({ submit, onChange, value }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="font-bold text-2xl">Forget Password</h1>
        <p className="text-light_text">Please enter your email to reset the password.</p>
        <div className="flex flex-col gap-8">
          <Input value={value} handleChange={onChange} type="email" placeholder={"Enter your email"} label={"Your Email"} />
          <Button onClick={submit} type="submit" text={`Reset Password`} />
        </div>
      </div>
      <NavLink className="mt-20" to="/login">
        <p className="mt-20 text-2xl flex gap-4 justify-center hover-opacity">
          <span>&larr; </span> <span>Login</span>
        </p>
      </NavLink>
    </div>
  );
};

const OTP = ({ otp, setOtp, email, verifyCode }) => {
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleResend = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true);
      setTimeLeft(60);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-[520px] mx-auto">
      <div className="flex flex-col gap-2 mb-10 w-full">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-light_text">
          We sent a reset link to <span className="font-bold">{email}</span>
        </p>
        <p className="text-light_text">Enter the 5-digit code mentioned in the email</p>
      </div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} className="!h-[50px] !w-[50px] text-center text-2xl rounded-md mx-1 sm:mx-3 border-2" />}
      />
      <div className="mt-10 flex flex-col w-full">
        <Button onClick={verifyCode} text="Verify Code" />
        <p className="mt-4 text-center">
          Haven't got the email yet?{" "}
          <button
            onClick={handleResend}
            disabled={isResendDisabled}
            className={`${isResendDisabled ? "opacity-50 cursor-not-allowed" : ""} text-blue-600`}
          >
            Resend Email
          </button>
        </p>
        {isResendDisabled && <p className="text-sm text-gray-500">Resend available in {timeLeft}s</p>}
      </div>
    </div>
  );
};

const PasswordReset = ({ password, setPassword, submitPassword }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Set a new password</h1>
        <p className="text-light_text">Create a new password. Ensure it differs from previous one for security</p>
      </div>
      <div className="mt-4 flex flex-col gap-8">
        <Input name="new" handleChange={setPassword} value={password.new} placeholder="Enter your new password" type="password" label="Password" />
        <Input
          name="confirm"
          handleChange={setPassword}
          value={password.confirm}
          placeholder="Re-enter password"
          type="password"
          label="Confirm Password"
        />
        <Button onClick={submitPassword} type="submit" text={`Update Password`} />
      </div>
    </div>
  );
};

export default ForgetPassword;
