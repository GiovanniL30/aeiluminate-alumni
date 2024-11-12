import express from "express";
import { deleteUserController, getUsersContoller } from "../controllers/userControler.js";

export const router = express.Router();

/**
 * Get users route
 */
router.get("/users", getUsersContoller);

/**
 * Delete user route
 */
router.delete("/user/delete/:id", deleteUserController);
