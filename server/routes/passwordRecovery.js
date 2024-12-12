import express from "express";
import { changePasswordController, sendOTPController, verifyOTPController } from "../controllers/passwordRecoveryController.js";

/**
 *
 * @author Giovanni Leo
 */
export const passwordRecoveryRoute = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Send OTP to email */
passwordRecoveryRoute.post("/send-otp", sendOTPController);

/** Verify given OTP */
passwordRecoveryRoute.post("/verify-otp", verifyOTPController);

/** Change  user password */
passwordRecoveryRoute.post("/change-pass", changePasswordController);
