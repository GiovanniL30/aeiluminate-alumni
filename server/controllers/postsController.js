import { ID, InputFile } from "node-appwrite";
import crypto from "crypto";

import { storage } from "../appwriteconfig.js";
import { addNewPost, addNewMedia } from "../mysqlQueries/queries.js";

export const uploadPostController = async (req, res) => {
  try {
    const { userId } = req;
    const { caption } = req.body;
    const postId = crypto.randomUUID();

    const mediaInfo = [];

    for (const file of req.files) {
      const mediaId = ID.unique();

      const result = await storage.createFile(process.env.APP_WRITE_IMAGES_BUCKET, mediaId, InputFile.fromBuffer(file.buffer, file.originalname));

      const fileUrl = `${process.env.APP_WRITE_ENDPOINT}/storage/buckets/${process.env.APP_WRITE_IMAGES_BUCKET}/files/${result.$id}/view`;

      mediaInfo.push({
        mediaID: result.$id,
        mediaType: file.mimetype,
        mediaURL: fileUrl,
      });
    }

    const postResult = await addNewPost(postId, userId, caption);
    if (!postResult) throw new Error("Failed to add new post");

    for (const media of mediaInfo) {
      const newMedia = await addNewMedia(media.mediaID, media.mediaType, media.mediaURL, postId);
      if (!newMedia) throw new Error("Failed to add new media");
    }

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error in uploadPostController:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Inserts a new aeline on the Database
 *
 * @method POST
 * @route /line
 */
export const uploadLineController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { caption } = req.body;
    const postId = crypto.randomUUID();

    const postResult = await addNewPost(postId, userId, caption);
    if (!postResult) throw new Error("Failed to add new post");

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error in uploadPostController:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
