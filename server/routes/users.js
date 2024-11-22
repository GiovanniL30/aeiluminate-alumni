import express from "express";
import {
  checkIsFollowingController,
  deleteUserController,
  followUserController,
  getUserController,
  getUsersContoller,
  getUserWithIdController,
  unFollowUserController,
  userFollowerController,
  userFollowingController,
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
router.get("/user", authenticateUserCookie, getUserController);

/**
 * Get users route with id
 */
router.get("/user/:id", authenticateUserCookie, getUserWithIdController);

/**
 * Delete user route
 */
router.delete("/user/delete/:id", deleteUserController);

/**
 * Get user follower count
 */
router.get("/user/follower/:id", userFollowerController);

/**
 * Get user following count
 */
router.get("/user/following/:id", userFollowingController);

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
