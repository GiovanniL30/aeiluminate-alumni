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
} from "../controllers/postsController.js";
import { upload } from "../multer.js";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { uploadMediaMiddleware } from "../middleware/uploadMedia.js";
import { deletePost } from "../mysqlQueries/deleteQueries.js";
import { checkIfUserPost } from "../mysqlQueries/readQueries.js";

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
postRouter.delete("/post/:id", authenticateUserToken, async (req, res) => {
  try {
    const { role, userId } = req;
    const { id } = req.params;

    const { isOwner } = await checkIfUserPost(userId, id);

    if (!isOwner && role !== "Admin" && role !== "Manager") {
      throw new Error("Only admin and Manager can do this operation");
    }

    const result = await deletePost(id);

    if (!result) throw new Error("Failed to delete Post");
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
