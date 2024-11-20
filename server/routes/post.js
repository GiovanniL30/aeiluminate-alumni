import express from "express";
import {
  getPostCommentAndLikeCountController,
  getPostController,
  uploadLineController,
  uploadPostController,
} from "../controllers/postsController.js";
import { upload } from "../multer.js";

export const postRouter = express.Router();

/**
 *
 * Upload Post Route
 */
postRouter.post("/post", upload.array("images"), uploadPostController);

/**
 *
 * Upload Line Route
 */
postRouter.post("/line", uploadLineController);

/**
 *
 * Get list of posts
 */
postRouter.get("/posts", getPostController);

/**
 *
 * Get post stats (comment and like count)
 */
postRouter.get("/post/stats/:id", getPostCommentAndLikeCountController);
