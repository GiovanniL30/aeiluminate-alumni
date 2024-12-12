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

import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { upload } from "../multer.js";

export const router = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Follow a user */
router.post("/user/follow/:id", authenticateUserToken, followUserController);

/** Unfollow a user */
router.post("/user/unfollow/:id", authenticateUserToken, unFollowUserController);

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
router.get("/user", authenticateUserToken, getUserController);

/** Get user with id */
router.get("/user/:id", authenticateUserToken, getUserWithIdController);

/** Get user follower count */
router.get("/user/follower/:id", userFollowerController);

/** Get user following */
router.get("/user/following/:id", userFollowingController);

/** Checks follow status */
router.get("/user/follow_status/:id", authenticateUserToken, checkIsFollowingController);

/**
 * ================================================================
 *                    DELETE ROUTES
 * ================================================================
 */

/**
 * Logout user
 */
router.delete("/logout", authenticateUserToken, logoutController);

/**  Delete user */
router.delete("/user/delete/:id", deleteUserController);

/**
 * ================================================================
 *                    UPDATE ROUTES
 * ================================================================
 */

/**  Upadate user details */
router.patch("/user/update/details", authenticateUserToken, updateUserDetailsController);

/**  Upadate user profile */
router.patch("/user/update/profile", upload.single("image"), authenticateUserToken, updateUserProfilePictureController);
