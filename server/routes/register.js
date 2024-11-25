import express from "express";
import { createUserAccountController } from "../controllers/registerController.js";

export const router = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Create new user route */
router.post("/client", createUserAccountController);
