import { addNewMessageController, conversationListController, getMessagesController } from "../controllers/conversationController.js";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import express from "express";

export const conversationRoute = express.Router();

conversationRoute.get("/messages", authenticateUserToken, getMessagesController);
conversationRoute.get("/list", authenticateUserToken, conversationListController);
conversationRoute.post("/message", authenticateUserToken, addNewMessageController);
