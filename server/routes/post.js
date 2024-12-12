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
  uploadJobListingController,
  deletePostController,
} from "../controllers/postsController.js";
import { upload } from "../multer.js";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { uploadMediaMiddleware } from "../middleware/uploadMedia.js";

/**
 *
 * @author Giovanni Leo
 */
export const postRouter = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Upload Post Route */
postRouter.post("/post", authenticateUserToken, upload.array("images"), uploadMediaMiddleware, uploadPostController);

/** Upload Line Route */
postRouter.post("/line", authenticateUserToken, uploadLineController);

/**Upload Job Listing Route */
postRouter.post("/job-listing", authenticateUserToken, uploadJobListingController);

/** Like a post */
postRouter.post("/post/like/:id", authenticateUserToken, likeController);

/** Unike a post */
postRouter.post("/post/unlike/:id", authenticateUserToken, unlikeController);

/** Add a comment */
postRouter.post("/post/comment/:id", authenticateUserToken, addCommentController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Get list of posts */
postRouter.get("/posts", authenticateUserToken, getPostController);

/** Get list of posts of a user */
postRouter.get("/posts/:id", authenticateUserToken, getUserPostsController);

/** Get post stats */
postRouter.get("/post/stats/:id", authenticateUserToken, getPostCommentAndLikeCountController);

/** Get list of comments on a post */
postRouter.get("/post/comments/:id", authenticateUserToken, getCommentsController);

/**
 * ================================================================
 *                   DELTE ROUTES
 * ================================================================
 */

/** Delete a post */
postRouter.delete("/post/:id", authenticateUserToken, deletePostController);
