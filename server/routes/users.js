import express from "express";
import {
  checkIsFollowingController,
  deleteUserController,
  followUserController,
  getUserController,
  getUsersContoller,
  unFollowUserController,
  userFollowerCountController,
} from "../controllers/userControler.js";

import { authenticateUserCookie } from "../middleware/authenticateCookie.js";

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

/**
 * Get user follower count
 */
router.get("/user/follower_count/:id", userFollowerCountController);

/**
 * Follow a user
 */
router.post("/user/follow/:id", authenticateUserCookie, followUserController);

/**
 * Unfollow a user
 */
router.post("/user/unfollow/:id", authenticateUserCookie, unFollowUserController);

/**
 * Checks follow status
 */
router.get("/user/follow_status/:id", authenticateUserCookie, checkIsFollowingController);
