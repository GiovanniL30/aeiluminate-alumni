import express from "express";
import { deleteUserController, getUserController, getUsersContoller } from "../controllers/userControler.js";

export const router = express.Router();

/**
 * Get users route
 */
router.get("/users", getUsersContoller);

/**
 * Get users route
 */
router.get("/user/:id", getUserController);

/**
 * Delete user route
 */
router.delete("/user/delete/:id", deleteUserController);
