import express from "express";
import { getProgramsController } from "../controllers/programController.js";

export const router = express.Router();

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Programs route */
router.get("/programs", getProgramsController);
