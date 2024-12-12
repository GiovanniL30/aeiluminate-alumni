import { checkEmail } from "../mysqlQueries/readQueries.js";
import { transporter, forgotPasswordEmail } from "../mail.js";
import crypto from "crypto";
import { changePassword } from "../mysqlQueries/updateQueries.js";
import bcrypt from "bcrypt";

/**
 * Used to store list of OTP
 */
const otpStore = new Map();

const generateOTP = () => {
  return crypto.randomInt(10000, 100000).toString();
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
};

/**
 *
 * Sends a new OTP code to the email
 *
 * @method POST
 * @route /api/recover/send-otp
 */
export const sendOTPController = async (req, res) => {
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
};

/**
 *
 * Verify if the OTP given is correct
 *
 * @method POST
 * @route /api/recover/verify-otp
 */
export const verifyOTPController = (req, res) => {
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
};

/**
 *
 * Change user password
 *
 * @method POST
 * @route /api/recover/change-pass
 */
export const changePasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password is required" });
    }

    const hashedPassword = await hashPassword(newPassword);
    const updatedPass = await changePassword(email, hashedPassword);

    if (!updatedPass) return res.status(400).json({ message: "Failed to change password, try again later" });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
