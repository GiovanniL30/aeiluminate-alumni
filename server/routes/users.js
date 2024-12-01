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
  loginController,
  logoutController,
  updateUserDetailsController,
  updateUserProfilePictureController,
} from "../controllers/userControler.js";

import { authenticateUserCookie } from "../middleware/authenticateCookie.js";
import { upload } from "../multer.js";

export const router = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Follow a user */
router.post("/user/follow/:id", authenticateUserCookie, followUserController);

/** Unfollow a user */
router.post("/user/unfollow/:id", authenticateUserCookie, unFollowUserController);

/** Login user route*/
router.post("/login", loginController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Get users */
router.get("/users", getUsersContoller);

/** Get user*/
router.get("/user", authenticateUserCookie, getUserController);

/** Get user with id */
router.get("/user/:id", authenticateUserCookie, getUserWithIdController);

/** Get user follower count */
router.get("/user/follower/:id", userFollowerController);

/** Get user following */
router.get("/user/following/:id", userFollowingController);

/** Checks follow status */
router.get("/user/follow_status/:id", authenticateUserCookie, checkIsFollowingController);

/**
 * ================================================================
 *                    DELETE ROUTES
 * ================================================================
 */

/**
 * Logout user
 */
router.delete("/logout", authenticateUserCookie, logoutController);

/**  Delete user */
router.delete("/user/delete/:id", deleteUserController);

/**
 * ================================================================
 *                    UPDATE ROUTES
 * ================================================================
 */
router.patch("/user/update/details", authenticateUserCookie, updateUserDetailsController);

router.patch("/user/update/profile", upload.single("image"), authenticateUserCookie, updateUserProfilePictureController);
