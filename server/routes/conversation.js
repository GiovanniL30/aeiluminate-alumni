import { addNewMessageController, conversationListController, getMessagesController } from "../controllers/conversationController.js";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import express from "express";

/**
 *
 * @author Giovanni Leo
 */
export const conversationRoute = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Add new message Route */
conversationRoute.post("/message", authenticateUserToken, addNewMessageController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Get conversation Route */
conversationRoute.get("/list", authenticateUserToken, conversationListController);

/** Get messages Route */
conversationRoute.get("/messages", authenticateUserToken, getMessagesController);
