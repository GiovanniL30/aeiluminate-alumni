import express from "express";
import { checkEmail } from "../mysqlQueries/readQueries.js";
import { transporter, forgotPasswordEmail } from "../mail.js";
import crypto from "crypto";
import { changePassword } from "../mysqlQueries/updateQueries.js";

export const passwordRecoveryRoute = express.Router();

const otpStore = new Map();

const generateOTP = () => {
  return crypto.randomInt(10000, 100000).toString();
};

passwordRecoveryRoute.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Please provide email" });

  try {
    const emailExist = await checkEmail(email);
    if (!emailExist) return res.status(400).json({ message: "Email does not exist" });

    const otp = generateOTP();
    const expiresAt = Date.now() + 2 * 60 * 1000;
    otpStore.set(email, { otp, expiresAt });
    setTimeout(() => otpStore.delete(email), 2 * 60 * 1000);

    transporter.sendMail(forgotPasswordEmail(email, otp));

    console.log(email);
    console.log(otp);

    res.json({ message: "If this email exists, you will receive an OTP." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

passwordRecoveryRoute.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  const storedOTP = otpStore.get(email);

  if (!storedOTP) {
    return res.status(400).json({ message: "OTP expired or does not exist." });
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  if (Date.now() > storedOTP.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired." });
  }

  otpStore.delete(email);
  res.json({ message: "OTP verified successfully." });
});

passwordRecoveryRoute.post("/change-pass", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password is required" });
    }

    const updatedPass = await changePassword(email, newPassword);

    if (!updatedPass) return res.status(400).json({ message: "Failed to change password, try again later" });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
