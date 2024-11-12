import express from "express";
import { createUserAccountController } from "../controllers/registerController.js";

export const router = express.Router();

/**
 * Create new user route
 */
router.post("/client", createUserAccountController);
