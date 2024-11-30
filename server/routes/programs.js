import express from "express";
import { getProgramsController } from "../controllers/programController.js";

export const programRouter = express.Router();

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Programs route */
programRouter.get("/programs", getProgramsController);
