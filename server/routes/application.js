import express from "express";
import { createUserAccountController } from "../controllers/registerController.js";
import { createApplicationController } from "../controllers/applicationController.js";

/**
 *
 * @author Giovanni Leo
 */
export const applicationRoute = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Upload Application Route */

applicationRoute.post("/apply", createUserAccountController, createApplicationController);
