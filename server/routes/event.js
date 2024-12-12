import express from "express";
import {
  uploadEventController,
  getEventsController,
  getUserEventsController,
  getUserInterestedEventsController,
  getInterestedUsersCountController,
  markInterestedController,
  unmarkInterestedController,
} from "../controllers/eventsController.js";
import { upload } from "../multer.js";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { uploadMediaMiddleware } from "../middleware/uploadMedia.js";

export const eventRouter = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Upload Event Route */
eventRouter.post("/event", authenticateUserToken, uploadEventController);

/** Mark an Event as Interested */
eventRouter.post("/event/interested/:id", authenticateUserToken, markInterestedController);

/** Unmark an Eent as Interestedt */
eventRouter.post("/event/uninterested/:id", authenticateUserToken, unmarkInterestedController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Get list of events */
eventRouter.get("/events", authenticateUserToken, getEventsController);

/** Get list of events of a user */
eventRouter.get("/events/:id", authenticateUserToken, getUserEventsController);

/** Get event stats */
eventRouter.get("/event/stats/:id", authenticateUserToken, getInterestedUsersCountController);

/** Get list of events a user is interested in */
eventRouter.get("/interested_events/:id", authenticateUserToken, getUserInterestedEventsController);