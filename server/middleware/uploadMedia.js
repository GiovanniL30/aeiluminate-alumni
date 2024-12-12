import { storage } from "../appwriteconfig.js";
import { InputFile } from "node-appwrite";
import crypto from "crypto";

/**
 * Uploads a new media on the req.files
 *
 * @author Giovanni Leo
 */
export const uploadMediaMiddleware = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const mediaInfo = [];

    // Iterate over all files uploaded
    for (const file of req.files) {
      const isValidType = allowedTypes.includes(file.mimetype);
      if (!isValidType) {
        return res.status(422).json({
          message: `Invalid file type: ${file.originalname}. Allowed types: ${allowedTypes.join(", ")}`,
        });
      }

      if (file.size > maxFileSize) {
        return res.status(422).json({
          message: `File size too large: ${file.originalname}. Max size is ${maxFileSize / 1024 / 1024} MB.`,
        });
      }

      const result = await storage.createFile(
        process.env.APP_WRITE_IMAGES_BUCKET,
        crypto.randomUUID(),
        InputFile.fromBuffer(file.buffer, file.originalname)
      );

      const mediaURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APP_WRITE_IMAGES_BUCKET}/files/${result.$id}/view?project=${process.env.APP_WRITE_PROJECT_ID}&mode=admin`;

      mediaInfo.push({
        mediaID: result.$id,
        mediaType: file.mimetype,
        mediaURL,
      });
    }

    req.mediaInfo = mediaInfo;

    next();
  } catch (error) {
    console.error("Error in uploadMedia middleware:", error);
    return res.status(500).json({ message: "Failed to upload media." });
  }
};
