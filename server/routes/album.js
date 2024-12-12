import express from "express";
import { authenticateUserToken } from "../middleware/authenticateToken.js";
import { upload } from "../multer.js";
import crypto from "crypto";
import { uploadPostController } from "../controllers/postsController.js";
import { uploadMediaMiddleware } from "../middleware/uploadMedia.js";
import {
  addNewPostOnAlbumController,
  getAlbumController,
  getAlbumInformationController,
  getAlbumsController,
} from "../controllers/albumController.js";

export const albumRouter = express.Router();

/**
 * ================================================================
 *                    POST ROUTES
 * ================================================================
 */

/** Create a new album */
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

/** Add image on the album */
albumRouter.post("/add", authenticateUserToken, upload.array("images"), uploadMediaMiddleware, addNewPostOnAlbumController);

/**
 * ================================================================
 *                    GET ROUTES
 * ================================================================
 */

/** Get all albums */
albumRouter.get("/all", getAlbumsController);

/** Get specific album */
albumRouter.get("/:id", getAlbumController);

/** Get album informations */
albumRouter.get("/information/:id", getAlbumInformationController);
