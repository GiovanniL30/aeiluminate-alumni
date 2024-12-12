import express from "express";

import { authenticateUserToken } from "../middleware/authenticateToken.js";

import { deleteJobListingController, getJobListingsController, uploadNewJoblistingController } from "../controllers/joblistingController.js";

/**
 *
 * @author Giovanni Leo, Jhea Jana Prudencio
 */
export const joblistingRoute = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Create a new job listing*/
joblistingRoute.post("/", authenticateUserToken, uploadNewJoblistingController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/**Get joblisitngs */
joblistingRoute.get("/", authenticateUserToken, getJobListingsController);

/**
 * ================================================================
 *                    DELETE ROUTES
 * ================================================================
 */

/** Delete job listing */
joblistingRoute.delete("/:id", authenticateUserToken, deleteJobListingController);
