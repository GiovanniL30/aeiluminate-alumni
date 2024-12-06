import express from "express";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { upload } from "../multer.js";
import crypto from "crypto";

import { uploadPostController } from "../controllers/postsController.js";
import { getAlbumInformation, getPostsByAlbumId } from "../mysqlQueries/readQueries.js";
import { uploadMediaMiddleware } from "../middleware/uploadMedia.js";
import { addNewMedia, addNewPost } from "../mysqlQueries/addQueries.js";

export const albumRouter = express.Router();

albumRouter.post(
  "/new",
  authenticateUserToken,
  upload.array("images"),
  (req, res, next) => {
    req.body.albumId = crypto.randomUUID();
    next();
  },
  uploadMediaMiddleware,
  uploadPostController
);

albumRouter.get("/:id", async (req, res) => {
  const albumId = req.params.id;

  try {
    const posts = await getPostsByAlbumId(albumId);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts for album:", error);
    res.status(500).json({ message: "Failed to retrieve posts for album" });
  }
});

albumRouter.get("/information/:id", async (req, res) => {
  const albumId = req.params.id;

  try {
    const albumInfo = await getAlbumInformation(albumId);
    res.json(albumInfo);
  } catch (error) {
    console.error("Error fetching album information or posts:", error);
    res.status(500).json({ message: "Failed to retrieve album information or posts" });
  }
});

albumRouter.post("/add", authenticateUserToken, upload.array("images"), uploadMediaMiddleware, async (req, res) => {
  try {
    const { userId, mediaInfo } = req;
    const { caption, albumId } = req.body;
    const postId = crypto.randomUUID();

    const postResult = await addNewPost(postId, userId, caption, new Date(), albumId);
    if (!postResult) throw new Error("Failed to add new post");

    for (const media of mediaInfo) {
      const newMedia = await addNewMedia(media.mediaID, media.mediaType, media.mediaURL, new Date(), postId);
      if (!newMedia) throw new Error("Failed to add new media");
    }

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error in uploadPostController:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});
