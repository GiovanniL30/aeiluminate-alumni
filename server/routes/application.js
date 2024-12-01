import express from "express";
import { createUserAccountController } from "../controllers/registerController";
import { addApplication } from "../mysqlQueries/addQueries";
import crypto from "crypto";
import { storage } from "../appwriteconfig";
import { ID, InputFile } from "node-appwrite";
import { upload } from "../multer";
import { removeUserAccount } from "../mysqlQueries/deleteQueries";

export const applicationRoute = express.Router();

applicationRoute.post("/apply", createUserAccountController, upload.array("images"), async (req, res) => {
  const { userId } = req;
  const applicationId = crypto.randomUUID();

  try {
    if (!req.files || req.files.length < 2) {
      throw new Error("Both diploma and school ID images are required.");
    }

    const mediaInfo = [];
    for (const file of req.files) {
      const result = await storage.createFile(process.env.APP_WRITE_IMAGES_BUCKET, ID.unique(), InputFile.fromBuffer(file.buffer, file.originalname));
      const mediaURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APP_WRITE_IMAGES_BUCKET}/files/${result.$id}/view?project=${process.env.APP_WRITE_PROJECT_ID}&mode=admin`;
      mediaInfo.push(mediaURL);
    }

    if (mediaInfo.length < 2) {
      throw new Error("Failed to upload images. Please try again.");
    }

    const newApplication = await addApplication(
      applicationId,
      mediaInfo[0], // Diploma
      mediaInfo[1], // School ID
      userId
    );

    if (!newApplication) {
      await removeUserAccount(userId);
      throw new Error("Failed to create application. Please try again.");
    }

    res.status(201).json({
      message: "Application submitted successfully.",
      applicationId,
    });
  } catch (error) {
    console.error("Error in application submission:", error.message || error);
    return res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});
