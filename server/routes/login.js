import express from "express";
import { loginController } from "../controllers/loginController.js";

export const router = express.Router();

/**
 * Login Route
 */
router.post("/login", loginController);
