import express from "express";
import {
  uploadEventController,
  getEventsController,
  getUserEventsController,
  getUserInterestedEventsController,
  getInterestedUsersCountController,
  markInterestedController,
  unmarkInterestedController,
  checkEventInterestedController,
  deleteEventController,
} from "../controllers/eventsController.js";

import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { uploadMediaMiddleware } from "../middleware/uploadMedia.js";
import { upload } from "../multer.js";

export const eventRouter = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Upload Event Route */
eventRouter.post("/", authenticateUserToken, upload.array("images"), uploadMediaMiddleware, uploadEventController);

/** Mark an Event as Interested */
eventRouter.post("/interested/:id", authenticateUserToken, markInterestedController);

/** Unmark an Eent as Interestedt */
eventRouter.post("/uninterested/:id", authenticateUserToken, unmarkInterestedController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Get list of events */
eventRouter.get("/", authenticateUserToken, getEventsController);

/** Get list of events of a user */
eventRouter.get("/:id", authenticateUserToken, getUserEventsController);

/** Get event stats */
eventRouter.get("/stats/:id", authenticateUserToken, getInterestedUsersCountController);

/** Get list of events a user is interested in */
eventRouter.get("/interested_events/:id", authenticateUserToken, getUserInterestedEventsController);

/** Check if the user is interested on the event*/
eventRouter.get("/user_interested/:id", authenticateUserToken, checkEventInterestedController);

/**
 * ================================================================
 *                    DELETE ROUTES
 * ================================================================
 */

/** Delete event */
eventRouter.delete("/:id", authenticateUserToken, deleteEventController);
