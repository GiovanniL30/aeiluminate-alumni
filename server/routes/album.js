import express from "express";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { upload } from "../multer.js";
import crypto from "crypto";

import { uploadPostController } from "../controllers/postsController.js";
import { uploadMediaMiddleware } from "../middleware/uploadMedia.js";
import { addNewPostOnAlbumController, getAlbumController, getAlbumInformationController } from "../controllers/albumController.js";
import { getAlbums } from "../mysqlQueries/readQueries.js";

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

albumRouter.get("/all", async (req, res, next) => {
  try {
    const { page, length } = req.query;

    const offset = (page - 1) * length;
    const { albums, total } = await getAlbums(parseInt(offset), parseInt(length));

    const updatedAlbums = albums.map((album) => ({
      albumId: album.albumId,
      albumTitle: album.albumTitle,
      albumIdOwner: album.albumIdOwner,
      latestPostID: album.latestPostID,
      latestPostCaption: album.latestPostCaption,
      latestPostCreatedAt: album.latestPostCreatedAt,
    }));

    const totalPage = Math.ceil(total / length);

    res.status(200).json({
      albums: updatedAlbums,
      totalAlbums: total,
      totalPage,
    });
  } catch (error) {
    console.error("Error in getting albums with latest posts:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

albumRouter.get("/:id", getAlbumController);

albumRouter.get("/information/:id", getAlbumInformationController);

albumRouter.post("/add", authenticateUserToken, upload.array("images"), uploadMediaMiddleware, addNewPostOnAlbumController);
