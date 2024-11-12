import express from "express";
import { getProgramsController } from "../controllers/programController.js";

export const router = express.Router();

/**
 * Programs route
 */
router.get("/programs", getProgramsController);
