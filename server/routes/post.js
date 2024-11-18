import express from "express";
import { uploadLineController, uploadPostController } from "../controllers/postsController.js";
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
