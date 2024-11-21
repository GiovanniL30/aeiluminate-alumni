import express from "express";
import {
  addCommentController,
  getCommentsController,
  getPostCommentAndLikeCountController,
  getPostController,
  likeController,
  unlikeController,
  uploadLineController,
  uploadPostController,
} from "../controllers/postsController.js";
import { upload } from "../multer.js";
import { authenticateUserCookie } from "../middleware/authenticateCookie.js";

export const postRouter = express.Router();

/**
 *
 * Upload Post Route
 */
postRouter.post("/post", authenticateUserCookie, upload.array("images"), uploadPostController);

/**
 *
 * Upload Line Route
 */
postRouter.post("/line", authenticateUserCookie, uploadLineController);

/**
 *
 * Get list of posts
 */
postRouter.get("/posts", authenticateUserCookie, getPostController);

/**
 *
 * Get post stats
 */
postRouter.get("/post/stats/:id", authenticateUserCookie, getPostCommentAndLikeCountController);

/**
 *
 * Like a post
 */
postRouter.post("/post/like/:id", authenticateUserCookie, likeController);

/**
 *
 * Unike a post
 */
postRouter.post("/post/unlike/:id", authenticateUserCookie, unlikeController);

/**
 *
 * Add a comment
 */
postRouter.post("/post/comment/:id", authenticateUserCookie, addCommentController);

/**
 *
 * Get list of comments on a post
 */
postRouter.get("/post/comments/:id", authenticateUserCookie, getCommentsController);
