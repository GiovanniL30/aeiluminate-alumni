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
} from "../controllers/userControler.js";

import { authenticateUserCookie } from "../middleware/authenticateCookie.js";
import { upload } from "../multer.js";
import { updateProfileDetails } from "../mysqlQueries/updateQueries.js";

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
router.patch("/user/update/details", authenticateUserCookie, async (req, res) => {
  const { firstName, middleName, lastName, userName, company, jobRole, bio, phoneNumber } = req.body;
  const { userId } = req;

  try {
    const update = await updateProfileDetails(userId, firstName, middleName, lastName, userName, company, jobRole, bio, phoneNumber);
    if (!update) throw new Error("Failed to update user details");

    res.status(200).json({ message: "Update Success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.patch("/user/update/profile", authenticateUserCookie, upload.single("image"), (req, res) => {});
