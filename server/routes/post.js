import express from "express";
import {
  addCommentController,
  getCommentsController,
  getPostCommentAndLikeCountController,
  getPostController,
  getUserPostsController,
  likeController,
  unlikeController,
  uploadLineController,
  uploadPostController,
} from "../controllers/postsController.js";
import { upload } from "../multer.js";
import { authenticateUserCookie } from "../middleware/authenticateCookie.js";

export const postRouter = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Upload Post Route */
postRouter.post("/post", authenticateUserCookie, upload.array("images"), uploadPostController);

/** Upload Line Route */
postRouter.post("/line", authenticateUserCookie, uploadLineController);

/** Like a post */
postRouter.post("/post/like/:id", authenticateUserCookie, likeController);

/** Unike a post */
postRouter.post("/post/unlike/:id", authenticateUserCookie, unlikeController);

/** Add a comment */
postRouter.post("/post/comment/:id", authenticateUserCookie, addCommentController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Get list of posts */
postRouter.get("/posts", authenticateUserCookie, getPostController);

/** Get list of posts of a user */
postRouter.get("/posts/:id", authenticateUserCookie, getUserPostsController);

/** Get post stats */
postRouter.get("/post/stats/:id", authenticateUserCookie, getPostCommentAndLikeCountController);

/** Get list of comments on a post */
postRouter.get("/post/comments/:id", authenticateUserCookie, getCommentsController);
